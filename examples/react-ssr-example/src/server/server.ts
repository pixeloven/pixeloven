import express, { Application } from "express";
import expressWinston from "express-winston";
import path from "path";
import winston from "winston";
import { Config } from "./config";
import { health } from "./controllers";
import { assetPath, renderer } from "./middleware";

/**
 * Define server logic here
 * @param app
 */
const server = (app: Application, config: Config) => {
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
    if (config.environment === "production") {
        app.use(
            assetPath(path.resolve(__dirname, "public/asset-manifest.json")),
        );
        app.use(
            config.publicPath,
            express.static(path.resolve(__dirname, "public")),
        );
    }

    /**
     * Register endpoints
     */
    app.use(config.publicPath, health);
    app.use(renderer(config.publicPath));
};

export default server;
