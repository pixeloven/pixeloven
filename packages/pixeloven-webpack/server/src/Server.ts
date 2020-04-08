import { mergeOptions } from "@pixeloven-core/common";
import { logger } from "@pixeloven-core/logger";
import { Compiler } from "@pixeloven-webpack/compiler";
import {
    defaultFileReporterOptions as reportingOptions,
    getFileReporter,
} from "@pixeloven-webpack/file-reporter";
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
import { Options, Protocol } from "./types";

/**
 * Default compiler options
 */
const defaultServerOptions: Options = {
    host: "localhost",
    ignored: /node_modules/,
    namespace: "webpack",
    path: "/",
    poll: 500,
    port: 8080,
    protocol: Protocol.http,
    reportingOptions,
};

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
function getServer(compiler: Compiler, options: Partial<Options> = {}) {
    const config = mergeOptions(defaultServerOptions, options);
    return Server(compiler, config);
}

/**
 * Sanitize url
 * @param item
 */
const normalizeUrl = (item: string) => item.replace(/([^:]\/)\/+/g, "$1");

/**
 * Wrapper for express dev server
 * @param compiler
 * @param options
 */
async function Server(compiler: Compiler, options: Options) {
    const fileReporter = getFileReporter(options.reportingOptions);
    const baseUrl = normalizeUrl(
        `${options.protocol}://${options.host}:${options.port}/${options.path}`,
    );
    const staticAssetPath = path.resolve(process.cwd(), "public");
    const webpackDevMiddleware = createWebpackDevMiddleware(compiler, {
        publicPath: options.path,
        watchOptions: {
            ignored: options.ignored,
            poll: options.poll,
        },
    });
    const webpackHotClientMiddleware = createWebpackHotClientMiddleware(
        compiler,
        {
            namespace: options.namespace,
            publicPath: options.path,
        },
    );
    const webpackHotServerMiddleware = createWebpackHotServerMiddleware(
        compiler,
        {
            done: stats => {
                const messages = fileReporter.fromStats(stats);
                fileReporter.printStats(messages);
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
                const messages = fileReporter.fromStats(stats);
                fileReporter.printStats(messages);
            },
            error: error => {
                logger.error(error.message);
            },
            publicPath: options.path,
        },
    );
    return new Promise<number>((resolve, reject) => {
        try {
            const app = express();
            logger.info(`---------- configuring development server ----------`);
            if (fs.existsSync(staticAssetPath)) {
                logger.info([
                    `found "public" directory...`,
                    `setting up static file serving`,
                ]);
                app.use(options.path, express.static(staticAssetPath));
            }
            logger.info(`mounting webpack development middleware`);
            app.use(webpackDevMiddleware);
            app.use(webpackHotClientMiddleware);
            app.use(webpackReactAssetMiddleware);
            app.use(webpackHotServerMiddleware);
            logger.info(`mounting error handler`);
            app.use(errorHandler);
            logger.info(`---------- connecting development server ----------`);
            app.listen(options.port, options.host, () => {
                logger.success(`development server is listening at ${baseUrl}`);
            });
            /**
             * @todo determine why this isn't being called.
             */
            app.on("mount", () => {
                logger.success(
                    `development server has mounted the application server`,
                );
            });
            /**
             * @description Captured CTRL-C or exited for another reason
             */
            process.on("exit", () => {
                logger.info(`development server is exiting`);
                resolve(0);
                process.exit();
            });
            process.on("SIGINT", () => {
                logger.info(`\ncaptured signal interrupt likely CTRL-C`);
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
