import express, { NextFunction, Request, Response } from "express";
import expressWinston from "express-winston";
import fs from "fs";
import path from "path";
import winston from "winston";
import { config } from "./config";
import { health } from "./controllers";
import { renderer } from "./middleware";

/**
 * Create express application
 * @type {Function}
 */
const app = express();

/**
 * Setup express logger
 */
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
    }),
);

/**
 * Defines static build files
 */
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

/**
 * Define render middleware
 * @todo CA-104 Get from manifest or pass in at build time.
 */
const cssFiles = fs
    .readdirSync(`${publicPath}/static/css`)
    .filter(fn => fn.endsWith(".css"))
    .map(file => `/static/css/${file}`);
const jsFiles = fs
    .readdirSync(`${publicPath}/static/js`)
    .filter(fn => fn.endsWith(".js"))
    .map(file => `/static/js/${file}`);
app.use(
    (req: Request, res: Response, next: NextFunction): void => {
        req.files = {
            css: cssFiles,
            js: jsFiles,
        };
        next();
    },
);
app.use(renderer);

/**
 * Register endpoints
 */
app.use(health);

/**
 * Start express server on specific host and port
 */
app.listen(config.server.port, config.server.host, () => {
    console.log(
        `Running on ${config.server.protocol}://${config.server.host}:${
            config.server.port
        }`,
    );
    console.log(`Serving static files from: ${publicPath}`);
});
