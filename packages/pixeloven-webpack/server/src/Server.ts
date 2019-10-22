import { mergeOptions } from "@pixeloven-core/common";
import { logger } from "@pixeloven-core/logger";
import { Compiler } from "@pixeloven-webpack/compiler";
import {
    createWebpackDevMiddleware,
    createWebpackHotClientMiddleware,
    createWebpackHotServerMiddleware,
    createWebpackReactAssetMiddleware,
    errorHandler,
} from "@pixeloven-webpack/server-middleware";
import express from "express";
import fs from "fs";
import path from "path";
import FileReporter from "./FileReporter";
import { Config, Protocol } from "./types";

/**
 * Default compiler options
 */
const defaultServerOptions: Config = {
    host: "localhost",
    ignored: /node_modules/,
    path: "/",
    poll: 500,
    port: 8080,
    protocol: Protocol.http,
};

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
function getServer(compiler: Compiler, options: Partial<Config> = {}) {
    const config = mergeOptions(defaultServerOptions, options);
    return Server(compiler, config);
}

async function Server(compiler: Compiler, config: Config) {
    const app = express();
    const normalizeUrl = (item: string) => item.replace(/([^:]\/)\/+/g, "$1");
    const baseUrl = normalizeUrl(
        `${config.protocol}://${config.host}:${config.port}/${config.path}`,
    );
    const staticAssetPath = path.resolve(process.cwd(), "public");
    if (fs.existsSync(staticAssetPath)) {
        logger.info([
            `found "public" directory...`,
            `setting up static file serving`,
        ]);
        app.use(config.path, express.static(staticAssetPath));
    }

    /**
     * Create middleware
     */
    const webpackDevMiddleware = createWebpackDevMiddleware(compiler, {
        publicPath: config.path,
        watchOptions: {
            ignored: config.ignored,
            poll: config.poll,
        },
    });
    const webpackHotClientMiddleware = createWebpackHotClientMiddleware(
        compiler,
        {
            publicPath: config.path,
        },
    );

    const webpackHotServerMiddleware = createWebpackHotServerMiddleware(
        compiler,
        {
            done: stats => {
                const fileReporter = FileReporter({
                    name: "server",
                });
                fileReporter.fromStats(stats);
            },
            error: error => {
                logger.error(error.message);
            },
        },
    );

    const webpackReactAssetMiddleware = createWebpackReactAssetMiddleware(
        compiler,
        {
            done: stats => {
                const fileReporter = FileReporter({
                    name: "client",
                });
                fileReporter.fromStats(stats);
            },
            error: error => {
                logger.error(error.message);
            },
            publicPath: config.path,
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
    logger.info(`---------- connecting server ----------`);
    return new Promise<number>((resolve, reject) => {
        try {
            app.listen(config.port, config.host, () => {
                logger.success(`development server is listening at ${baseUrl}`);
            });
            app.on("mount", () => {
                logger.success(
                    `development server has mounted the application server`,
                );
            });
            /**
             * @description Captured CTRL-C or exited for another reason
             * @todo figure out why we can't do app.on for this
             */
            process.on("exit", () => {
                logger.info(`development server is exiting`);
                resolve(0);
                process.exit();
            });
            process.on("SIGINT", () => {
                logger.info(`development server is shutting down`);
                resolve(0);
                process.exit();
            });
            process.on("uncaughtException", err => {
                logger.error(err.message);
                reject(err);
                process.exit();
            });
        } catch (err) {
            reject(err);
        }
    });
}

export { getServer, Server };
