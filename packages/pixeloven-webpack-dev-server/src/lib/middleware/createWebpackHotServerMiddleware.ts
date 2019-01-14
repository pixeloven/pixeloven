import { Application } from "express";
import { MultiCompiler } from "webpack";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import { Config } from "../config";

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo To support before and after hooks with a more unified config we should probably fork this middleware
 * @param config
 * @param compiler
 * @param watchOptions
 */
const createWebpackHotServerMiddleware = (
    app: Application,
    config: Config,
    compiler: MultiCompiler,
) => {
    return webpackHotServerMiddleware(compiler, {
        serverRendererOptions: {
            app,
            server: config,
        },
    });
};

export default createWebpackHotServerMiddleware;
