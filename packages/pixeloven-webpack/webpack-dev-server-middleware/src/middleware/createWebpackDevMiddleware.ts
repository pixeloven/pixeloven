import { logger } from "@pixeloven-core/logger";
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
 * @todo Create our own formatter
 *  - https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/typescriptFormatter.js
 * @param config
 * @param compiler
 * @param watchOptions
 */
const createWebpackDevMiddleware = (
    compiler: Compiler,
    config: DevMiddlewareConfig,
) => {
    return webpackDevMiddleware(compiler.combined, {
        ...config,
        index: false,
        logLevel: "error",
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
                        logger.success("Compiled successfully.");
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
