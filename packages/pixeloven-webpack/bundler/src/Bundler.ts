import { mergeOptions } from "@pixeloven-core/common";
import { createOrEmptyDir } from "@pixeloven-core/filesystem";
import { logger } from "@pixeloven-core/logger";
import { Compiler } from "@pixeloven-webpack/compiler";
import { FileReporter } from "@pixeloven-webpack/file-reporter";
import chalk from "chalk";
import { Compiler as SingleCompiler, Stats } from "webpack";
import { Options } from "./types";

/**
 * Default bundler options
 */
const defaultBundlerOptions: Options = {
    clean: true,
    outputPath: "./dist",
};

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
function getBundler(compiler: Compiler, options: Partial<Options> = {}) {
    const mergedOptions = mergeOptions(defaultBundlerOptions, options);
    return Bundler(compiler, mergedOptions);
}

/**
 * Setup constants for bundle size
 * @todo should be part of the options
 * @description These sizes are pretty large. We"ll warn for bundles exceeding them.
 */
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

/**
 * @todo Generalize this further so don't need to create abstractions for server, client etc. Requires compiler wrapper to be redone.
 *
 * @param compiler
 * @param options
 */
async function Bundler(compiler: Compiler, options: Options) {
    const errorOnWarning = process.env.CI === "true";
    const outputPath = options.outputPath;
    const fileReporter = await FileReporter({
        errorOnWarning,
        outputPath,
        warnAfterBundleGzipSize: WARN_AFTER_BUNDLE_GZIP_SIZE,
        warnAfterChunkGzipSize: WARN_AFTER_CHUNK_GZIP_SIZE,
    });

    async function runner(webpackCompiler: SingleCompiler) {
        return new Promise<number>((resolve, reject) => {
            webpackCompiler.run((err: Error, stats: Stats) => {
                if (err) {
                    reject(err);
                }
                const messages = fileReporter.fromStats(stats);
                resolve(fileReporter.printMessages(messages));
            });
        });
    }

    async function client() {
        logger.info(`starting ${chalk.bold("client")} build`);
        if (compiler.client) {
            if (compiler.hasServerCodePath) {
                logger.info(
                    `${chalk.bold("client")} code path has been discovered`,
                );
                return runner(compiler.client);
            }
            logger.error(`compiler is set but code path could not be found`);
            return 1;
        }
        return 0;
    }

    async function server() {
        logger.info(`starting ${chalk.bold("server")} build`);
        if (compiler.server) {
            if (compiler.hasServerCodePath) {
                logger.info(
                    `${chalk.bold("server")} code path has been discovered`,
                );
                return runner(compiler.server);
            }
            logger.error(`compiler is set but code path could not be found`);
            return 2;
        }
        return 0;
    }

    try {
        // Run stats on old build if it exists
        const previousFileSizes = await fileReporter.fromFileSystem();
        fileReporter.printFileStats("previous", previousFileSizes);

        // Clean up old build
        if (options.clean) {
            logger.info("cleaning up previous builds");
            createOrEmptyDir(options.outputPath);
        }

        // Attempt build
        let statusCode = 0;
        statusCode += await client();
        statusCode += await server();

        // Run stats on new build if it exists
        const latestFileSizes = await fileReporter.fromFileSystem();
        fileReporter.printFileStats("latest", latestFileSizes);

        // Compare the two builds if they exist
        fileReporter.printFileStatsComparison(
            latestFileSizes,
            previousFileSizes,
        );
        return statusCode;
    } catch (err) {
        logger.error(err.message);
    }
    return 4;
}

export { getBundler, Bundler };
