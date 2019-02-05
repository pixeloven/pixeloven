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
                `Found "public" directory...`,
                `Setting up static file serving`,
            ]);
            app.use(this.config.path, express.static(publicPath));
        }

        /**
         * Create middleware
         */
        const webpackDevMiddleware = createWebpackDevMiddleware(this.compiler, {
            publicPath: this.config.path,
            watchOptions: {
                poll: this.config.machine !== "host" ? 500 : false,
            },
        });
        const webpackHotClientMiddleware = createWebpackHotClientMiddleware(
            this.compiler,
            {
                publicPath: this.config.path,
            },
        );

        let refreshCount = 0;
        const webpackHotServerMiddleware = createWebpackHotServerMiddleware(
            this.compiler,
            {
                done: stats => {
                    if (refreshCount) {
                        logger.info("---------- Restarting ----------");
                    } else {
                        logger.info("---------- Creating ----------");
                    }
                    const json = stats.toJson("normal");
                    logger.info(
                        `Webpack built server ${json.hash} in ${json.time}ms`,
                    );
                    logger.info("Applying bundled server to stream");

                    refreshCount++;
                },
                error: error => {
                    logger.error(error.message);
                },
            },
        );
        const webpackReactAssetMiddleware = createWebpackReactAssetMiddleware(
            this.compiler,
            {
                done: stats => {
                    const json = stats.toJson("normal");
                    logger.info(
                        `Webpack built client ${json.hash} in ${json.time}ms`,
                    );
                    logger.info("Applying bundled react assets to stream");
                    refreshCount++;
                },
                error: error => {
                    logger.error(error.message);
                },
            },
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
