import { Application, NextFunction, Request, Response } from "express";
import { flushChunkNames } from "react-universal-component/server";
import { Stats } from "webpack";
import flushChunks from "webpack-flush-chunks";
import { renderer } from "./middleware";

interface RendererOptions {
    clientStats: Stats;
    serverStats: Stats;
}

/**
 * Allows us to configure our development server prior to rendering
 * @todo eventually we should unify our middleware and make this more unified
 */
export const config = () => {
    return {
        after: (app: Application) => {
            console.log("After!!!!!!!!!!!!!!");
        },
        before: (app: Application) => {
            console.log("Before!!!!!!!!!!!!!!");
        },
    }
}

/**
 * Webpack Dev server
 * @param options
 */
export default (options: RendererOptions) => {
    // TODO might still be able to register static server here and routes -- unify dev and prod
    const { scripts, stylesheets } = flushChunks(options.clientStats, {
        chunkNames: flushChunkNames(),
    });

    /**
     * Register client settings
     * @description Currently CSS is not emitted and is therefore inline. This means we don't yet need to reference it here.
     */
    return (req: Request, res: Response, next: NextFunction): void => {
        req.files = {
            css: stylesheets,
            js: scripts,
        };
        renderer(req, res, next);
    };
};
