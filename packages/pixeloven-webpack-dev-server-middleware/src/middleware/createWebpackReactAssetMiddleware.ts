import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import { NextFunction, Request, Response } from "express";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import DynamicMiddleware from "./DynamicMiddleware";

/**
 * Applies react assets to server requests
 * @todo Add better logging for what assets were discovered
 * @param compiler
 */
function webpackReactAssetMiddleware(compiler: Compiler) {
    if (compiler.client) {
        const dynamicMiddleware = new DynamicMiddleware();
        try {
            compiler.onDone("client", (stats) => {
                const clientStats = stats.toJson("verbose");
                const { scripts, stylesheets } = flushChunks(clientStats, {
                    chunkNames: flushChunkNames(),
                });

                logger.info("Applying bundled react assets to stream");
                dynamicMiddleware.clean();
                dynamicMiddleware.mount((req: Request, res: Response, next: NextFunction) => {
                    req.files = {
                        css: stylesheets,
                        js: scripts,
                    };
                    next();
                });
            });
            return dynamicMiddleware.handle();
        } catch (err) {
            logger.error(err.message);
            return (req: Request, res: Response, next: NextFunction) => {
                next(err);
            };
        }
    }
    logger.warn(
        `Webpack compiler "client" not found starting without`,
    );
    return (req: Request, res: Response, next: NextFunction) => {
        next();
    };
}

/**
 * Creates webpackHotMiddleware with custom configuration
 * @todo To support before and after hooks with a more unified config we should probably fork this middleware
 * @param compiler
 */
const createWebpackReactAssetMiddleware = (compiler: Compiler) => {
    return webpackReactAssetMiddleware(compiler);
};

export default createWebpackReactAssetMiddleware;
