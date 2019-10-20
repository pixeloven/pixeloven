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
 * @todo should be part of the options
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

interface Messages {
    errors: string[];
    warnings: string[];
}

interface Something {
    fileSizes: string[];
    outputPath: string;
    errorOnWarning: boolean;
}

/**
 * Compiler handler
 * @todo make treat warnings as errors as an option
 * @todo eliminate react-utils
 *
 * @param outputPath
 * @param fileSizes
 * @param webpackCompiler
 */
async function runner(webpackCompiler: SingleCompiler, options: Something) {
    function output(messages: Messages, stats: Stats) {
        if (messages.errors.length) {
            logger.error(messages.errors.join("\n\n"));
            return 1;
        }
        if (options.errorOnWarning) {
            logger.info("treating warnings as errors");
            if (messages.warnings.length) {
                logger.error(messages.warnings.join("\n\n"));
                return 1;
            }
        }
        if (messages.warnings.length) {
            logger.error(messages.warnings.join("\n\n"));
        }
        logger.success("compiled successfully");
        logger.info("file sizes after gzip\n");
        printFileSizesAfterBuild(
            stats,
            options.fileSizes,
            options.outputPath,
            WARN_AFTER_BUNDLE_GZIP_SIZE,
            WARN_AFTER_CHUNK_GZIP_SIZE,
        );
        return 0;
    }

    return new Promise<number>((resolve, reject) => {
        webpackCompiler.run((err: Error, stats: Stats) => {
            if (err) {
                return reject(err);
            } else {
                const messages: Messages = formatWebpackMessages(
                    stats.toJson("verbose"),
                );
                const status = output(messages, stats);
                return resolve(status);
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
    const errorOnWarning = process.env.CI === "true";
    const outputPath = options.outputPath;
    const fileSizes: string[] = await measureFileSizesBeforeBuild(outputPath);
    if (options.clean) {
        logger.info("cleaning up previous builds...");
        createOrEmptyDir(outputPath);
    }

    /**
     * Simplify the compiler so we can generalize these
     */
    async function client() {
        if (compiler.hasClientCodePath) {
            logger.info(`${options.name} code path found...`);
            if (compiler.client) {
                return runner(compiler.client, {
                    errorOnWarning,
                    fileSizes,
                    outputPath,
                });
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
                return runner(compiler.server, {
                    errorOnWarning,
                    fileSizes,
                    outputPath,
                });
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
