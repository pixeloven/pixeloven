import { logger } from "@pixeloven/node-logger";
import path from "path";
import { Compiler } from "webpack";
import webpackHotMiddleware from "webpack-hot-middleware";
import { Config } from "../config";

/**
 * Creates webpackHotMiddleware with custom configuration
 * @param config
 * @param compiler
 * @param watchOptions
 */
const createWebpackHotMiddleware = (
    config: Config,
    clientCompiler: Compiler,
) => {
    return webpackHotMiddleware(clientCompiler, {
        heartbeat: 3000,
        log: logger.info,
        path: path.normalize(`${config.publicPath}/__webpack_hmr`),
        reload: true,
    });
};

export default createWebpackHotMiddleware;
