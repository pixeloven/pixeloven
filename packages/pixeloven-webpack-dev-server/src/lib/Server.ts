import { logger } from "@pixeloven/node-logger";
import express from "express";
import fs from "fs";
import path from "path";
import Compiler from "./Compiler";
import { Config } from "./config";
import {
    createWebpackDevMiddleware,
    createWebpackHotMiddleware,
    createWebpackHotServerMiddleware,
    errorHandler,
} from "./middleware";

type ServerOnComplete = (error?: Error) => void;

class Server {
    protected compiler: Compiler;
    protected config: Config;

    /**
     * Construct server
     * @param compiler
     * @param config
     */
    constructor(compiler: Compiler, config: Config) {
        this.compiler = compiler;
        this.config = config;
    }

    /**
     * Start server from webpack configuration
     * @param compilerConfig
     * @param onComplete
     */
    public start(onComplete: ServerOnComplete) {
        const app = express();
        if (this.compiler.server) {
            this.compiler.server.hooks.done.tap(
                "PixelOvenWebpackDevServer",
                () => {
                    logger.info("DONE!!!!!!!!!!!!");
                },
            );
        }
        /**
         * @todo Support coverage and type docs. Plus storybook docs
         */
        const publicPath = path.resolve(process.cwd(), "public");
        if (fs.existsSync(publicPath)) {
            logger.info(
                'Static file directory "public" found. Automatically setting up static file serving.',
            );
            app.use(this.config.path, express.static(publicPath));
        } // TODO should we log here?
        app.use(
            createWebpackDevMiddleware(this.config, this.compiler.combined),
        );
        if (this.compiler.client) {
            app.use(
                createWebpackHotMiddleware(this.config, this.compiler.client),
            );
        }
        app.use(
            createWebpackHotServerMiddleware(
                this.config,
                this.compiler.combined,
            ),
        );
        app.use(errorHandler);

        // Start express server on specific host and port
        app.listen(this.config.port, this.config.host, onComplete);
    }
}

export default Server;
