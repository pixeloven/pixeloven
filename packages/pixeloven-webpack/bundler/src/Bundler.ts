import { mergeOptions } from "@pixeloven-core/common";
import { createOrEmptyDir } from "@pixeloven-core/filesystem";
import { logger } from "@pixeloven-core/logger";
import { Compiler } from "@pixeloven-webpack/compiler";
import { FileReporter } from "@pixeloven-webpack/file-reporter";
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
    /**
     * @todo these should be broken into two steps so FileReporter can compare before and after (which seems broken anyway)
     */
    if (options.clean) {
        logger.info("cleaning up previous builds...");
        createOrEmptyDir(options.outputPath);
    }
    /**
     * Simple wrapper fro running a single compiler
     * @param webpackCompiler
     */
    async function runner(webpackCompiler: SingleCompiler, outputPath: string) {
        const fileReporter = await FileReporter({
            errorOnWarning,
            outputPath,
            warnAfterBundleGzipSize: WARN_AFTER_BUNDLE_GZIP_SIZE,
            warnAfterChunkGzipSize: WARN_AFTER_CHUNK_GZIP_SIZE,
        });
        return new Promise<number>((resolve, reject) => {
            webpackCompiler.run((err: Error, stats: Stats) =>
                err ? reject(err) : resolve(fileReporter.fromStats(stats)),
            );
        });
    }

    async function client() {
        if (compiler.client) {
            if (compiler.hasServerCodePath) {
                logger.info(`client code path has been found...`);
                return runner(compiler.client, `${options.outputPath}/public`);
            }
            logger.error(`compiler is set but code path could not be found`);
            return 1;
        }
        return 0;
    }

    async function server() {
        if (compiler.server) {
            if (compiler.hasServerCodePath) {
                logger.info(`server code path has been found...`);
                return runner(compiler.server, options.outputPath);
            }
            logger.error(`compiler is set but code path could not be found`);
            return 2;
        }
        return 0;
    }
    let statusCode = 0;
    statusCode += await client();
    statusCode += await server();
    return statusCode;
}

export { getBundler, Bundler };
