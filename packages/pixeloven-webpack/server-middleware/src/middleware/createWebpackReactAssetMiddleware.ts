/* tslint:disable no-any */
import { DynamicMiddleware } from "@pixeloven-express/dynamic-middleware";
import { Compiler } from "@pixeloven-webpack/compiler";
import { NextFunction, Request, Response } from "express";
import { normalize } from "path";
import { clearChunks, flushChunkNames } from "react-universal-component/server";
import { Stats } from "webpack";
import flushChunks from "webpack-flush-chunks";

interface ReactAssetMiddlewareConfig {
    done?: (stats: Stats) => void;
    error?: (stats: Error) => void;
    publicPath: string;
}

interface ReactAssetMiddleware {
    publicPath: string;
    stylesheets: string[];
    scripts: string[];
}

function reactAssetMiddleware(config: ReactAssetMiddleware) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { publicPath, stylesheets, scripts } = config;
        req.files = {
            css: stylesheets.map((file) => normalize(`/${publicPath}/${file}`)),
            js: scripts.map((file) => normalize(`/${publicPath}/${file}`)),
        };
        next();
    };
}

/**
 * Applies react assets to server requests
 * @todo Add better logging for what assets were discovered.
 *      Technically this isn't react specific. We should own flushChunks as it helps with webpack handling.
 * @param compiler
 */
function webpackReactAssetMiddleware(
    compiler: Compiler,
    config: ReactAssetMiddlewareConfig,
) {
    if (!compiler.client) {
        return (req: Request, res: Response, next: NextFunction) => {
            next();
        };
    }
    try {
        const dynamicMiddleware = new DynamicMiddleware();
        compiler.onDone("client", (stats: Stats) => {
            if (stats.compilation.compiler.name === "client") {
                clearChunks();
                const clientStats = stats.toJson("verbose");
                const { scripts, stylesheets } = flushChunks(
                    clientStats as any,
                    {
                        chunkNames: flushChunkNames(),
                    },
                );
                dynamicMiddleware.clean();
                dynamicMiddleware.mount(
                    reactAssetMiddleware({
                        publicPath: config.publicPath,
                        stylesheets,
                        scripts,
                    }),
                );
                // @todo we should remove all these and just hook into the done state ourselves
                if (config.done) {
                    config.done(stats);
                }
            }
        });
        return dynamicMiddleware.handle();
    } catch (err) {
        if (config.error) {
            config.error(err);
        }
        return (req: Request, res: Response, next: NextFunction) => {
            next(err);
        };
    }
}

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo To support before and after hooks with a more unified config we should probably fork this middleware
 * @param compiler
 */
const createWebpackReactAssetMiddleware = (
    compiler: Compiler,
    config: ReactAssetMiddlewareConfig = {
        publicPath: "/",
    },
) => {
    return webpackReactAssetMiddleware(compiler, config);
};

export default createWebpackReactAssetMiddleware;
