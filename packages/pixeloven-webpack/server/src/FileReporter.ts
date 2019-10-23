import { logger } from "@pixeloven-core/logger";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { Stats } from "webpack";

interface FileReporterOptions {
    name: string;
}

/**
 * @todo Unify with bundler file reporter eventually
 */
function FileReporter(options: FileReporterOptions) {
    let buildCounter = 0;

    function fromStats(stats: Stats) {
        const statsJSON = stats.toJson("verbose");
        /**
         * https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/formatWebpackMessages.js
         */
        const formatted = formatWebpackMessages(statsJSON);
        if (buildCounter) {
            logger.info(`---------- rebuilding ${options.name} ----------`);
        } else {
            logger.info(`---------- creating ${options.name} ----------`);
        }
        logger.info(
            `webpack ${options.name} built ${statsJSON.hash} in ${statsJSON.time}ms`,
        );
        if (formatted) {
            if (stats.hasErrors()) {
                logger.error(formatted.errors);
                logger.error("compiled with errors");
            } else if (stats.hasWarnings()) {
                logger.warn(formatted.warnings);
                logger.warn("compiled with warnings");
            } else {
                // @todo print file and gzip sizes
                logger.success("compiled successfully");
            }
        } else {
            logger.error(
                `failed to retrieve webpack stats for ${options.name}`,
            );
        }
        buildCounter++;
    }

    return {
        fromStats,
    };
}

export default FileReporter;
