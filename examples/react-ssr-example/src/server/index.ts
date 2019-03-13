import express from "express";
import { config } from "./config";
import server from "./server";

/**
 * Create express application
 * @type {Function}
 */
const app = express();
server(app, config);

/**
 * Start express server on specific host and port
 * @description Need to export for development server to work
 */
if (config.environment.node === "production") {
    app.listen(config.server.port, config.server.host);
}
export default app;
