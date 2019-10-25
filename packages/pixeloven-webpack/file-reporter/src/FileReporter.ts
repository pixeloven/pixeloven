import { logger } from "@pixeloven-core/logger";
import chalk from "chalk";
import filesize from "filesize";
import path from "path";
import { Stats } from "webpack";
import {
    formatWebpackMessages,
    getDifferenceLabel,
    measureFileSizes,
} from "./helper";
import { FileReporterOptions, FileSizes, SimplifiedStats } from "./types";

function FileReporter(options: FileReporterOptions) {
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
            }
            logger.success("compiled successfully");
        }
        logger.info(`waiting...`);
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
                const isLarge = value > maxRecommendedSize;
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
                    `skip reporting for ${chalk.bold(
                        name,
                    )} since build does not exist`,
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
                    `skipping comparison not enough build information was collected`,
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

export { FileReporter };
