import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    createWebpackDevMiddleware,
    createWebpackHotClientMiddleware,
    createWebpackHotServerMiddleware,
    createWebpackReactAssetMiddleware,
    errorHandler,
} from "@pixeloven/webpack-dev-server-middleware";
import express from "express";
import fs from "fs";
import path from "path";
import { Config } from "./config";

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
    public async create() {
        const app = express();
        /**
         * @todo Support coverage and type docs. Plus storybook docs
         */
        const publicPath = path.resolve(process.cwd(), "public");
        if (fs.existsSync(publicPath)) {
            logger.info([
                `Found "public" directory`, 
                `Automatically setting up static file serving`
            ]);
            app.use(this.config.path, express.static(publicPath));
        }

        /**
         * Create middleware
         * @todo have all middleware return a promise
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
        const webpackReactAssetMiddleware = createWebpackReactAssetMiddleware(
            this.compiler,
        );
        /**
         * Apply middleware to server application
         */
        app.use(webpackDevMiddleware);
        app.use(webpackHotClientMiddleware);
        app.use(webpackReactAssetMiddleware);
        app.use(webpackHotServerMiddleware);
        app.use(errorHandler);
        return app;
    }
}

export default Server;
