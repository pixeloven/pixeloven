import { logger } from "@pixeloven/node-logger";
import Promise from "promise";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import webpack, { Configuration, Stats } from "webpack";

/**
 * Setup constants for bundle size
 * @description These sizes are pretty large. We"ll warn for bundles exceeding them.
 */
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

/**
 * Get FileSizeReporter functions
 */
const { printFileSizesAfterBuild } = FileSizeReporter;

/**
 * Build Information
 */
export type OpaqueFileSizes = [];

export interface BuildInformation {
    stats: Stats;
    previousFileSizes: OpaqueFileSizes;
    warnings: string[];
}

/**
 * Print msg on status of build
 * @param warnings
 */
export function printBuildStatus(warnings: string[]) {
    if (warnings.length) {
        logger.warn("Compiled with warnings.");
        logger.warn(warnings.join("\n\n")); // TODO print array??? can webpacl-log handle this natively???
        logger.warn(
            'Search for the "keywords" to learn more about each warning.',
        );
    } else {
        logger.info("Compiled successfully.");
    }
}

/**
 * Print build file sizes
 * @param buildPath
 * @param stats
 * @param previousFileSizes
 */
export function printBuildFileSizesAfterGzip(
    buildPath: string,
    stats: Stats,
    previousFileSizes: OpaqueFileSizes,
) {
    logger.info("File sizes after gzip:\n");
    printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        buildPath,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
    );
    console.log();
}

/**
 * Create the production build
 * @todo Handle errors better https://webpack.js.org/api/node/
 * @param config
 * @param previousFileSizes
 */
export function build(
    config: Configuration,
    previousFileSizes: OpaqueFileSizes,
) {
    logger.info("Creating an optimized production build...");
    const compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err: Error, stats: Stats) => {
            if (err) {
                return reject(err);
            }
            const messages = formatWebpackMessages(stats.toJson("verbose"));
            if (messages.errors.length) {
                return reject(new Error(messages.errors.join("\n\n")));
            }
            if (
                process.env.CI &&
                process.env.CI.toLowerCase() !== "false" &&
                messages.warnings.length
            ) {
                logger.info(
                    "Treating warnings as errors because process.env.CI = true.",
                );
                logger.info("Most CI servers set it automatically.");
                return reject(new Error(messages.warnings.join("\n\n")));
            }
            return resolve({
                previousFileSizes,
                stats,
                warnings: messages.warnings,
            });
        });
    });
}
