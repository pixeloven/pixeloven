import { Name } from "@pixeloven-core/env";
import { createOrEmptyDir } from "@pixeloven-core/filesystem";
import { logger } from "@pixeloven-core/logger";
import { Compiler } from "@pixeloven-webpack/compiler";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { Compiler as SingleCompiler, Stats } from "webpack";
import { Options } from "./types";

/**
 * Setup constants for bundle size
 * @description These sizes are pretty large. We"ll warn for bundles exceeding them.
 */
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

/**
 * Get FileSizeReporter functions
 */
const {
    measureFileSizesBeforeBuild,
    printFileSizesAfterBuild,
} = FileSizeReporter;

/**
 * Compiler handler
 * @param path
 * @param fileSizes
 * @param webpackCompiler
 */
function handler(
    path: string,
    fileSizes: string[],
    webpackCompiler: SingleCompiler,
) {
    return new Promise<number>((resolve, reject) => {
        webpackCompiler.run((err: Error, stats: Stats) => {
            if (err) {
                return reject(err);
            } else {
                const messages = formatWebpackMessages(stats.toJson("verbose"));
                if (messages.errors.length) {
                    return reject(new Error(messages.errors.join("\n\n")));
                }
                if (messages.warnings.length) {
                    logger.warn("Compiled with warnings.");
                    logger.warn(messages.warnings.join("\n\n"));
                    logger.warn(
                        'Search for the "keywords" to learn more about each warning.',
                    );
                    if (
                        process.env.CI &&
                        process.env.CI.toLowerCase() !== "false" &&
                        messages.warnings.length
                    ) {
                        logger.info(
                            "Treating warnings as errors because process.env.CI = true.",
                        );
                        logger.info("Most CI servers set it automatically.");
                        return reject(
                            new Error(messages.warnings.join("\n\n")),
                        );
                    }
                } else {
                    logger.success("Compiled successfully.");
                    logger.info("File sizes after gzip:\n");
                    printFileSizesAfterBuild(
                        stats,
                        fileSizes,
                        path,
                        WARN_AFTER_BUNDLE_GZIP_SIZE,
                        WARN_AFTER_CHUNK_GZIP_SIZE,
                    );
                }
                return resolve(0);
            }
        });
    });
}

/**
 * @todo hasClientCodePath belongs in bundler or another util not in compiler
 * @todo hasServerCodePath belongs in bundler or another util not in compiler
 * @param compiler
 * @param options
 */
async function Bundler(compiler: Compiler, options: Options) {
    if (options.clean) {
        logger.info("cleaning up previous builds...");
        createOrEmptyDir(options.outputPath);
    }

    const previousFileSizes: string[] = await measureFileSizesBeforeBuild(
        options.outputPath,
    );

    /**
     * Simplify the compiler so we can generalize these
     */
    async function client() {
        if (compiler.hasClientCodePath) {
            logger.info(`${options.name} code path found...`);
            if (compiler.client) {
                return handler(
                    options.outputPath,
                    previousFileSizes,
                    compiler.client,
                );
            } else {
                logger.error(`${options.name} compiler not found.`);
            }
            logger.error(`${options.name} code path not found.`);
        }
        return 1;
    }

    async function server() {
        if (compiler.hasServerCodePath) {
            logger.info(`${options.name} code path found...`);
            if (compiler.server) {
                return handler(
                    options.outputPath,
                    previousFileSizes,
                    compiler.server,
                );
            } else {
                logger.error(`${options.name} compiler not found.`);
            }
            logger.error(`${options.name} code path not found.`);
        }
        return 1;
    }

    switch (options.name) {
        case Name.client:
            return client();
        case Name.server:
            return server();
        default:
            logger.warn("nothing to compile");
    }
    return 0;
}

export default Bundler;
