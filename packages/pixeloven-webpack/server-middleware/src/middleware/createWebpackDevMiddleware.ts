import { Compiler } from "@pixeloven-webpack/compiler";
import { Stats, WatchOptions } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

interface DevMiddlewareConfig {
    publicPath: string;
    watchOptions: WatchOptions;
}

/**
 * Creates webpackDevMiddleware with custom configuration
 * @todo Long term we should own this to help facilitate error handling and reporting.
 *
 * @param config
 * @param compiler
 * @param watchOptions
 */
function createWebpackDevMiddleware(
    compiler: Compiler,
    config: DevMiddlewareConfig,
    done?: (stats: Stats) => void,
) {
    return webpackDevMiddleware(compiler.combined, {
        index: false,
        logLevel: "error",
        publicPath: config.publicPath,
        reporter: (middlewareOptions, reporterOptions) => {
            if (reporterOptions.state && reporterOptions.stats) {
                if (done) {
                    done(reporterOptions.stats);
                }
            }
        },
        serverSideRender: true,
        watchOptions: config.watchOptions,
    });
}

export default createWebpackDevMiddleware;
