import { Application } from "express";
import expressWinston from "express-winston";
import winston from "winston";
import { config } from "./config";
import { health } from "./controllers";
import { errorHandler, renderer } from "./middleware";

/**
 * Define server logic here
 * @param app
 */
const server = (app: Application) => {
    /**
     * Setup express logger
     */
    app.use(
        expressWinston.logger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: "storage/logs/info.log",
                    level: "info",
                }),
                new winston.transports.File({
                    filename: "storage/logs/error.log",
                    level: "error",
                }),
            ],
        }),
    );

    /**
     * Register endpoints
     */
    app.use(config.baseUrl, health);
    app.use(renderer);
    app.use(errorHandler);
};

export default server;
