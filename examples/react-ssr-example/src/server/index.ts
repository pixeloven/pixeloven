import express from "express";
import path from "path";
import { config } from "./config";
import { assetPath } from "./middleware";
import server from "./server";

/**
 * Create express application
 * @type {Function}
 */
const app = express();

/**
 * Define render middleware
 * @todo Apply only for Production
 */
if (config.environment === "production") {
    app.use(assetPath(path.resolve(__dirname, "public/asset-manifest.json")));
    app.use(config.baseUrl, express.static(path.resolve(__dirname, "public")));
}
server(app);

/**
 * Start express server on specific host and port
 * @description Need to export for development server to work
 */
if (config.environment === "production") {
    app.listen(config.server.port, config.server.host);
}

export default app;
