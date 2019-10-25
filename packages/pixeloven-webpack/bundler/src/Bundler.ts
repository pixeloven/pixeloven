import { mergeOptions } from "@pixeloven-core/common";
import { createOrEmptyDir } from "@pixeloven-core/filesystem";
import { logger } from "@pixeloven-core/logger";
import { Compiler } from "@pixeloven-webpack/compiler";
import {
    defaultFileReporterOptions as reportingOptions,
    getFileReporter,
} from "@pixeloven-webpack/file-reporter";
import chalk from "chalk";
import { Compiler as SingleCompiler, Stats } from "webpack";
import { Options } from "./types";

/**
 * Default bundler options
 */
const defaultBundlerOptions: Options = {
    clean: true,
    outputPath: "./dist",
    reportingOptions,
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
 * Wrapper for bundling application code
 * @param compiler
 * @param options
 */
async function Bundler(compiler: Compiler, options: Options) {
    const fileReporter = getFileReporter(options.reportingOptions);
    async function runner(webpackCompiler: SingleCompiler) {
        return new Promise<number>((resolve, reject) => {
            webpackCompiler.run((err: Error, stats: Stats) => {
                if (err) {
                    reject(err);
                }
                const messages = fileReporter.fromStats(stats);
                fileReporter.printStats(messages);
                resolve(0);
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
        const previousFileSizes = await fileReporter.fromFileSystem(
            options.outputPath,
        );
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
        const latestFileSizes = await fileReporter.fromFileSystem(
            options.outputPath,
        );
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
