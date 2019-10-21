import { logger } from "@pixeloven-core/logger";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { Stats } from "webpack";

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

interface FileReporterOptions {
    outputPath: string;
    errorOnWarning: boolean;
    warnAfterBundleGzipSize: number;
    warnAfterChunkGzipSize: number;
}

async function FileReporter(options: FileReporterOptions) {
    const previousFileSizes: string[] = await measureFileSizesBeforeBuild(
        options.outputPath,
    );

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
        logger.info("file sizes after gzip\n");
        printFileSizesAfterBuild(
            stats,
            previousFileSizes,
            options.outputPath,
            options.warnAfterBundleGzipSize,
            options.warnAfterChunkGzipSize,
        );
        return 0;
    }

    return {
        fromStats,
    };
}

export default FileReporter;
