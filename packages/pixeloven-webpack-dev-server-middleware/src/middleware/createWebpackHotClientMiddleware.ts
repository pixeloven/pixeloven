import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import path from "path";
import webpackHotMiddleware from "webpack-hot-middleware";

interface ClientMiddlewareConfig {
    publicPath: string;
}

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo Re-write to take advantage of newest features along side custom server middleware
 *
 * @param config
 * @param compiler
 * @param watchOptions
 */
const createWebpackHotClientMiddleware = (
    config: ClientMiddlewareConfig,
    compiler: Compiler,
) => {
    if (compiler.client) {
        return webpackHotMiddleware(compiler.client, {
            heartbeat: 3000,
            log: logger.info,
            path: path.normalize(`${config.publicPath}/__webpack_hmr`),
            reload: true,
        });
    }
    return undefined;
};

export default createWebpackHotClientMiddleware;
