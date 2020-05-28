import { mergeOptions } from "@pixeloven-core/common";
import { createOrEmptyDir } from "@pixeloven-core/filesystem";
import { chalk, logger } from "@pixeloven-core/logger";
import { Compiler } from "@pixeloven-webpack/compiler";
import {
    defaultFileReporterOptions as reportingOptions,
    getFileReporter,
} from "@pixeloven-webpack/file-reporter";
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
        if (compiler.client) {
            logger.info(`starting ${chalk.bold("client")} build`);
            return runner(compiler.client);
        }
        return 0;
    }

    async function library() {
        if (compiler.library) {
            logger.info(`starting ${chalk.bold("library")} build`);
            return runner(compiler.library);
        }
        return 0;
    }

    async function server() {
        if (compiler.server) {
            logger.info(`starting ${chalk.bold("server")} build`);
            return runner(compiler.server);
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

        const statusCodes = await Promise.all([client(), library(), server()]);
        const statusCode = statusCodes.reduce((total, num) => total + num);

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
