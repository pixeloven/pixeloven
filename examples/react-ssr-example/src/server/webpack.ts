import { Application,NextFunction, Request, Response } from "express";
import { flushChunkNames } from "react-universal-component/server";
import { Stats } from "webpack";
import flushChunks from "webpack-flush-chunks";
import server from "./server";

interface RendererOptions {
    app: Application,
    clientStats: Stats;
    serverStats: Stats;
}

/**
 * Webpack Dev server
 * @param options
 */
export default (options: RendererOptions) => {

    /**
     * Apply application to dev-server
     */
    server(options.app)

    // TODO could unify this in assetPath.ts
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
        next();
    };
};
