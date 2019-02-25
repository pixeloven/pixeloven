import { DynamicMiddleware } from "@pixeloven/express-dynamic-middleware";
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import { NextFunction, Request, Response } from "express";
import { flushChunkNames } from "react-universal-component/server";
import { Stats } from "webpack";
import flushChunks from "webpack-flush-chunks";

interface ReactAssetMiddlewareConfig {
    done?: (stats: Stats) => void;
    error?: (stats: Error) => void;
}

/**
 * Applies react assets to server requests
 * @todo Add better logging for what assets were discovered
 * @param compiler
 */
const webpackReactAssetMiddleware = (
    compiler: Compiler,
    config: ReactAssetMiddlewareConfig,
) => {
    if (compiler.client) {
        const dynamicMiddleware = new DynamicMiddleware();
        const onDoneHandler = (stats: Stats) => {
            /**
             * @todo Find a way for the compiler to filter these out.
             */
            if (stats.compilation.compiler.name === "client") {
                const clientStats = stats.toJson("verbose");
                const { scripts, stylesheets } = flushChunks(clientStats, {
                    chunkNames: flushChunkNames(),
                });
                logger.info("---------- Assets Discovered ----------");
                logger.info(stylesheets);
                logger.info(scripts);
                dynamicMiddleware.clean();
                dynamicMiddleware.mount(
                    (req: Request, res: Response, next: NextFunction) => {
                        req.files = {
                            css: stylesheets,
                            js: scripts,
                        };
                        next();
                    },
                );
                if (config.done) {
                    config.done(stats);
                }
            }
        };

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
};

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo To support before and after hooks with a more unified config we should probably fork this middleware
 * @param compiler
 */
const createWebpackReactAssetMiddleware = (
    compiler: Compiler,
    config: ReactAssetMiddlewareConfig = {},
) => {
    return webpackReactAssetMiddleware(compiler, config);
};

export default createWebpackReactAssetMiddleware;
