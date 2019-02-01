import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { WatchOptions } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

interface DevMiddlewareConfig {
    publicPath: string;
    watchOptions?: WatchOptions;
}

/**
 * Creates webpackDevMiddleware with custom configuration
 * @todo Remove formatWebpackMessages and handle ourselves
 * @todo make more configurable
 *
 * @param config
 * @param compiler
 * @param watchOptions
 */
const createWebpackDevMiddleware = (
    config: DevMiddlewareConfig,
    compiler: Compiler,
) => {
    return webpackDevMiddleware(compiler.combined, {
        ...config,
        index: false,
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
    });
};

export default createWebpackDevMiddleware;
