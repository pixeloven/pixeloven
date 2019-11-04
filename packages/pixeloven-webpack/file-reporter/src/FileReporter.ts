import { mergeOptions } from "@pixeloven-core/common";
import { chalk, logger } from "@pixeloven-core/logger";
import filesize from "filesize";
import path from "path";
import { Stats } from "webpack";
import {
    formatWebpackMessages,
    getDifferenceLabel,
    measureFileSizes,
} from "./helper";
import {
    FileReporterOptions,
    FileSizes,
    PartialFileReporterOptions,
    SimplifiedStats,
} from "./types";

/**
 * Setup constants for bundle size
 * @todo should be part of the options
 * @description These sizes are pretty large. We"ll warn for bundles exceeding them.
 */
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

/**
 * Default FileReporter options
 */
export const defaultFileReporterOptions: FileReporterOptions = {
    errorOnWarning: false,
    warnAfterBundleGzipSize: WARN_AFTER_BUNDLE_GZIP_SIZE,
    warnAfterChunkGzipSize: WARN_AFTER_CHUNK_GZIP_SIZE,
};

/**
 * Create file reporter with default values
 * @todo we could probably pass file reporter in to server and bundler instead of having it a hard dependency
 * @param options
 */
export function getFileReporter(options: PartialFileReporterOptions = {}) {
    const mergedOptions = mergeOptions(defaultFileReporterOptions, options);
    return FileReporter(mergedOptions);
}

export function FileReporter(options: FileReporterOptions) {
    /**
     * @todo need to add better understand of errors for both of the below scenarios...
     *      status codes would be good for CLI error handling
     */
    async function fromFileSystem(outputPath: string) {
        try {
            return await measureFileSizes(outputPath);
        } catch (err) {
            return false;
        }
    }

    /**
     * @todo need to add better understand of errors for both of the below scenarios...
     *      status codes would be good for CLI error handling
     */
    function fromStats(stats: Stats) {
        try {
            return formatWebpackMessages(stats.toJson("verbose"));
        } catch (err) {
            return false;
        }
    }

    function printStats(stats?: SimplifiedStats | false) {
        if (stats) {
            if (options.errorOnWarning) {
                logger.info("treating warnings as errors");
            }
            if (stats.hash && stats.time) {
                logger.info(
                    `webpack completed build ${stats.hash} in ${stats.time}ms`,
                );
            } else if (stats.time) {
                logger.info(`webpack completed build in ${stats.time}ms`);
            } else {
                logger.info(`webpack completed build`);
            }
            if (stats.errors.length) {
                logger.error(stats.errors);
                logger.error("compiled with errors");
            } else if (stats.warnings.length) {
                if (options.errorOnWarning) {
                    logger.error(stats.warnings);
                    logger.error("compiled with errors");
                } else {
                    logger.warn(stats.warnings);
                    logger.warn("compiled with warnings");
                }
            } else {
                logger.success("compiled successfully");
            }
        }
    }

    function printFileStats(name: string, fileStats?: FileSizes | false) {
        if (fileStats) {
            logger.info(
                `collecting ${chalk.bold(name)} build stats from ${
                    fileStats.root
                }`,
            );
            for (const [key, value] of fileStats.sizes) {
                const readableSize = filesize(value);
                const isJsFile = path.extname(key) === ".js";
                const isMainBundle = key.indexOf("main.") === 0;
                const maxRecommendedSize = isMainBundle
                    ? options.warnAfterBundleGzipSize
                    : options.warnAfterChunkGzipSize;
                const isLarge = maxRecommendedSize
                    ? value > maxRecommendedSize
                    : false;
                const label = chalk.dim(`(${readableSize})`);
                if (isLarge && isJsFile) {
                    if (options.errorOnWarning) {
                        logger.error(`${key} ${label}`);
                    } else {
                        logger.warn(`${key} ${label}`);
                    }
                } else {
                    logger.info(`${key} ${label}`);
                }
            }
        } else {
            if (options.errorOnWarning) {
                logger.error(
                    `${chalk.bold(
                        name,
                    )} build could not be located so unable to continue`,
                );
            } else {
                logger.warn(
                    `skipping ${chalk.bold(
                        name,
                    )} build reporting since it does not exist`,
                );
            }
        }
    }

    function printFileStatsComparison(
        latest?: FileSizes | false,
        previous?: FileSizes | false,
    ) {
        if (latest && previous) {
            for (const [key, value] of latest.sizes) {
                const previousSize = previous.sizes.get(key);
                if (previousSize) {
                    const difference = getDifferenceLabel(value, previousSize);
                    logger.info(`${key} ${difference}`);
                }
            }
        } else {
            if (options.errorOnWarning) {
                logger.error(
                    `unable to compare build stats with collected data`,
                );
            } else {
                logger.warn(
                    `skipping comparison due to not enough information being collected`,
                );
            }
        }
    }

    return {
        fromFileSystem,
        fromStats,
        printFileStats,
        printFileStatsComparison,
        printStats,
    };
}
