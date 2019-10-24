import { logger } from "@pixeloven-core/logger";
import chalk from "chalk";
import filesize from "filesize";
import path from "path";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { Stats } from "webpack";
import { getDifferenceLabel, measureFileSizes } from "./helper";
import { FileReporterOptions, FileSizes, Messages } from "./types";

async function FileReporter(options: FileReporterOptions) {
    // @todo reporter should be able to report raw data from either source and then have printing functionality

    if (options.errorOnWarning) {
        logger.info("treating warnings as errors");
    }

    async function fromFileSystem() {
        try {
            return await measureFileSizes(options.outputPath);
        } catch (err) {
            return false;
        }
    }

    /**
     * @todo we need to own format webpack so we can control output and reduce deps
     * @todo Would like this and the filesystem one to be closely inline
     * @todo the from functions should return or throw errors. Bundler returns status based on these
     *
     * @param stats
     */
    function fromStats(stats: Stats) {
        const messages: Messages = formatWebpackMessages(
            stats.toJson("verbose"),
        );
        return messages;
    }

    function printMessages(messages: Messages) {
        if (messages.errors.length) {
            logger.error(messages.errors.join("\n\n"));
            return 1;
        }
        if (options.errorOnWarning) {
            if (messages.warnings.length) {
                logger.error(messages.warnings.join("\n\n"));
                return 1;
            }
        }
        if (messages.warnings.length) {
            logger.error(messages.warnings.join("\n\n"));
        }
        logger.success("compiled successfully");
        return 0;
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
                if (isLarge && isJsFile) {
                    if (options.errorOnWarning) {
                        logger.error(`${key} (${readableSize})`);
                    } else {
                        logger.warn(`${key} (${readableSize})`);
                    }
                } else {
                    logger.info(`${key} (${readableSize})`);
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
                    const readableSize = filesize(value);
                    if (difference) {
                        logger.info(`${key} (${readableSize}) ${difference}`);
                    } else {
                        logger.info(`${key} (${readableSize}) (no change)`);
                    }
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
        printMessages,
    };
}

export { FileReporter };
