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
 * Defines public path
 */
const publicPath = path.resolve(__dirname, "public");

/**
 * Define render middleware
 */
app.use(assetPath(publicPath, config.basePath));
app.use(config.basePath, express.static(publicPath));
server(app);

/**
 * Start express server on specific host and port
 */
const application = app.listen(config.server.port, config.server.host, () => {
    console.log(
        `Running on ${config.server.protocol}://${config.server.host}:${
            config.server.port
        }`,
    );
    console.log(`Serving static files from: ${publicPath}`);
});

export default application;
