import { MultiCompiler } from "webpack";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import { Config } from "../config";

/**
 * Creates webpackHotMiddleware with custom configuration
 * @param config 
 * @param compiler 
 * @param watchOptions 
 */
const createWebpackHotServerMiddleware = (config: Config, compiler: MultiCompiler) => {
    return webpackHotServerMiddleware(compiler, {
        serverRendererOptions: {
            server: config.server
        }
    });
}

export default createWebpackHotServerMiddleware;
