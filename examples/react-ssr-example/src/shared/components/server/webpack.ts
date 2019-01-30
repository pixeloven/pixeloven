import { AssetManifest } from "@server/utils";
import { Application, NextFunction, Request, Response } from "express";
import { Stats } from "webpack";
import server from "./server";

interface RendererOptions {
    app: Application;
    clientStats: Stats;
    serverStats: Stats;
}

/**
 * Webpack Dev server
 * @param options
 */
export default (options: RendererOptions) => {
    /**
     * Get asset manifest from webpack stats
     */
    const asset = new AssetManifest({
        stats: options.clientStats,
    });

    /**
     * Apply application to dev-server
     */
    server(options.app);

    /**
     * Register client settings
     */
    return (req: Request, res: Response, next: NextFunction): void => {
        if (asset.manifest) {
            req.files = asset.manifest;
        }
        next();
    };
};
