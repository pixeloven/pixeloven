/* tslint:disable no-any */
import { DynamicMiddleware } from "@pixeloven-express/dynamic-middleware";
import { Compiler } from "@pixeloven-webpack/compiler";
import { NextFunction, Request, Response } from "express";
import { normalize } from "path";
import { flushChunkNames } from "react-universal-component/server";
import { Stats } from "webpack";
import flushChunks from "webpack-flush-chunks";

interface ReactAssetMiddlewareConfig {
    done?: (stats: Stats, scripts: string[], stylesheets: string[]) => void;
    error?: (stats: Error) => void;
    publicPath: string;
}

/**
 * Applies react assets to server requests
 * @todo Add better logging for what assets were discovered
 * @param compiler
 */
function webpackReactAssetMiddleware(
    compiler: Compiler,
    config: ReactAssetMiddlewareConfig,
) {
    const dynamicMiddleware = new DynamicMiddleware();

    function onDoneHandler(stats: Stats) {
        if (stats.compilation.compiler.name === "client") {
            const clientStats = stats.toJson("verbose");
            const { scripts, stylesheets } = flushChunks(clientStats as any, {
                chunkNames: flushChunkNames(),
            });
            dynamicMiddleware.clean();
            dynamicMiddleware.mount(
                (req: Request, res: Response, next: NextFunction) => {
                    req.files = {
                        css: stylesheets.map(file =>
                            normalize(`/${config.publicPath}/${file}`),
                        ),
                        js: scripts.map(file =>
                            normalize(`/${config.publicPath}/${file}`),
                        ),
                    };
                    next();
                },
            );
            if (config.done) {
                config.done(stats, scripts, stylesheets);
            }
        }
    }

    if (compiler.client) {
        try {
            compiler.onDone("client", onDoneHandler);
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
    return (req: Request, res: Response, next: NextFunction) => {
        next();
    };
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
