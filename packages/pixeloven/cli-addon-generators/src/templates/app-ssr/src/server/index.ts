import express from "express";
import { config } from "./config";
import server from "./server";

/**
 * @description catch unhandled errors and log them to console and exit purposefully. Any errors logged here should be fixed ASAP.
 */
process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
});

/**
 * Create express application
 * @type {Function}
 */
const app = express();
server(app, config)
    .then(() => {
        /**
         * Start express server on specific host and port for production builds only.
         * @description Need to export for development server to work
         */
        if (config.environment.node === "production") {
            app.listen(config.server.port, config.server.host);
        }
    })
    .catch((error) => {
        /**
         * @todo UC-61 improve server error logging
         * @description This catches and exits only if the express
         */
        console.error(error);
        process.exit(1);
    });

export default app;
