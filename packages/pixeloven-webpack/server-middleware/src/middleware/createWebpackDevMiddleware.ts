import { logger } from "@pixeloven-core/logger";
import { Compiler } from "@pixeloven-webpack/compiler";
import { Stats, WatchOptions } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

interface DevMiddlewareConfig {
    publicPath: string;
    watchOptions: WatchOptions;
    done?: (stats: Stats) => void;
}

/**
 * Creates webpackDevMiddleware with custom configuration
 * @todo Create our own formatter
 *  - https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/typescriptFormatter.js
 * @param config
 * @param compiler
 * @param watchOptions
 */
function createWebpackDevMiddleware(
    compiler: Compiler,
    config: DevMiddlewareConfig,
) {
    return webpackDevMiddleware(compiler.combined, {
        index: false,
        logLevel: "error",
        publicPath: config.publicPath,
        reporter: (middlewareOptions, reporterOptions) => {
            if (
                reporterOptions.state &&
                reporterOptions.stats &&
                middlewareOptions.logLevel !== "silent"
            ) {
                if (config.done) {
                    config.done(reporterOptions.stats);
                }
            } else {
                logger.info("Waiting...");
            }
        },
        serverSideRender: true,
        watchOptions: config.watchOptions,
    });
}

export default createWebpackDevMiddleware;
