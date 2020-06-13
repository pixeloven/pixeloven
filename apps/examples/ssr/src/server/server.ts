import {assetPath} from "@pixeloven-express/middleware-asset-manifest";
import express, {Application, Router} from "express";
import expressWinston from "express-winston";
import path from "path";
import winston from "winston";
import {Config} from "./config";
import {health} from "./controllers";
import {errorHandler, renderer} from "./middleware";

/**
 * Define server logic here
 * @param app
 */
async function server(app: Application, config: Config) {
    /**
     * Setup express logger
     */
    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
        }),
    );

    /**
     * Define render middleware
     * @todo Apply only for Production
     */
    if (config.environment.node === "production") {
        app.use(assetPath(config.publicPath, path.resolve(__dirname, "public/asset-manifest.json")));
        app.use(config.publicPath, express.static(path.resolve(__dirname, "public")));
    }

    /**
     * @description Register endpoints here
     */
    const router = Router();
    router.get("/api/v1/health", health);
    router.all("/api/*", (req, res, next) => {
        res.status(404).send();
    });
    app.use(config.publicPath, router);

    /**
     * Register endpoints
     */
    app.use(renderer(config));

    /**
     * Setup express error handling
     */
    app.use(
        expressWinston.errorLogger({
            transports: [new winston.transports.Console()],
        }),
    );
    app.use(errorHandler(config));
}

export default server;
