import express from "express";
import expressWinston from "express-winston";
import path from "path";
import winston from "winston";
import { config } from "./config";
import { health } from "./controllers";
import { assetPath, errorHandler, renderer } from "./middleware";

/**
 * Create express application
 * @type {Function}
 */
const app = express();

/**
 * Setup express logger
 * @todo Log to file AND need to catch stack trace and what not
 */
app.use(
    expressWinston.logger({
        transports: [
            new winston.transports.Console(),
            // new winston.transports.File({
            //     filename: "error.log",
            //     level: "error",
            // })
        ],
    }),
);

/**
 * Register endpoints
 * @todo all endpoints and middleware should respond at the baseUrl https://stackoverflow.com/questions/4375554/is-it-possible-to-set-a-base-url-for-nodejs-app
 */
app.use("/v1/health", health);

/**
 * Defines public path
 */
const publicPath = path.resolve(__dirname, "public");

/**
 * Define render middleware
 */
app.use(config.basePath, express.static(publicPath));
app.use(assetPath(publicPath, config.basePath));
app.use(renderer);
app.use(errorHandler);

/**
 * Start express server on specific host and port
 */
const server = app.listen(config.server.port, config.server.host, () => {
    console.log(
        `Running on ${config.server.protocol}://${config.server.host}:${
            config.server.port
        }`,
    );
    console.log(`Serving static files from: ${publicPath}`);
});

export default server;
