import { logger } from "@pixeloven/node-logger";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { MultiCompiler } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import { Config } from "../config";

/**
 * Creates webpackDevMiddleware with custom configuration
 * @param config
 * @param compiler
 * @param watchOptions
 */
const createWebpackDevMiddleware = (
    config: Config,
    compiler: MultiCompiler,
) => {
    return webpackDevMiddleware(compiler, {
        index: false,
        logLevel: config.logLevel,
        publicPath: config.path,
        reporter: (middlewareOptions, reporterOptions) => {
            if (
                reporterOptions.state &&
                reporterOptions.stats &&
                middlewareOptions.logLevel !== "silent"
            ) {
                const stats = formatWebpackMessages(
                    reporterOptions.stats.toJson("verbose"),
                );
                if (stats) {
                    if (reporterOptions.stats.hasErrors()) {
                        logger.error(stats.errors);
                        logger.error("Failed to compile.");
                    } else if (reporterOptions.stats.hasWarnings()) {
                        logger.warn(stats.warnings);
                        logger.warn("Compiled with warnings.");
                    } else {
                        logger.info("Compiled successfully.");
                    }
                } else {
                    logger.error(
                        "Unexpected Error: Failed to retrieve webpack stats.",
                    );
                }
            } else {
                logger.info("Waiting...");
            }
        },
        serverSideRender: true,
        watchOptions: {
            aggregateTimeout: 200,
            poll: config.machine !== "host" ? 500 : false,
        },
    });
};

export default createWebpackDevMiddleware;
