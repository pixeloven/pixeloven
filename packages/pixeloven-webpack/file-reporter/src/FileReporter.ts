import { logger } from "@pixeloven-core/logger";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { Stats } from "webpack";
import {
    measureFileSizesBeforeBuild,
    printFileSizesAfterBuild,
} from "./helper";
import { FileReporterOptions, FileSizeMap, Messages } from "./types";

async function FileReporter(options: FileReporterOptions) {
    let previousFileSizes: FileSizeMap | undefined;
    try {
        previousFileSizes = await measureFileSizesBeforeBuild(
            options.outputPath,
        );
    } catch (error) {
        logger.warn("could not locate previous build");
        logger.info("skipping build comparison stats");
    }

    function fromStats(stats: Stats) {
        const messages: Messages = formatWebpackMessages(
            stats.toJson("verbose"),
        );
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
        logger.info("---------- file sizes after gzip ----------");
        /**
         * @todo This is temporary until I can get better abstraction around stats
         */
        if (previousFileSizes) {
            printFileSizesAfterBuild(
                stats,
                previousFileSizes,
                options.outputPath,
                options.warnAfterBundleGzipSize,
                options.warnAfterChunkGzipSize,
            );
        }
        return 0;
    }

    return {
        fromStats,
    };
}

export { FileReporter };
