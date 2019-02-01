import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    createWebpackDevMiddleware,
    createWebpackHotClientMiddleware,
    createWebpackHotServerMiddleware,
    errorHandler,
} from "@pixeloven/webpack-dev-server-middleware";
import express from "express";
import fs from "fs";
import path from "path";
import { Config } from "./config";

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
        /**
         * @todo Support coverage and type docs. Plus storybook docs
         */
        const publicPath = path.resolve(process.cwd(), "public");
        if (fs.existsSync(publicPath)) {
            logger.info(
                "Static public file directory found. Automatically setting up static file serving.",
            );
            app.use(this.config.path, express.static(publicPath));
        }

        /**
         * Create middleware
         */
        const webpackDevMiddleware = createWebpackDevMiddleware(
            {
                publicPath: this.config.path,
                watchOptions: {
                    poll: this.config.machine !== "host" ? 500 : false,
                },
            },
            this.compiler,
        );
        const webpackHotClientMiddleware = createWebpackHotClientMiddleware(
            {
                publicPath: this.config.path,
            },
            this.compiler,
        );
        const webpackHotServerMiddleware = createWebpackHotServerMiddleware(
            this.compiler,
        );

        /**
         * Apply middleware to server application
         */
        app.use(webpackDevMiddleware);
        if (webpackHotClientMiddleware) {
            app.use(webpackHotClientMiddleware);
        }
        app.use(webpackHotServerMiddleware);
        app.use(errorHandler);

        // Start express server on specific host and port
        return app.listen(this.config.port, this.config.host, onComplete);
    }
}

export default Server;
