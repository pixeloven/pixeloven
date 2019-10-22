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
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import { Stats } from "webpack";
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

interface FileReporterOptions {
    name: string;
}

/**
 * @todo Unify with bundler file reporter eventually
 */
function FileReporter(options: FileReporterOptions) {
    function fromStats(stats: Stats) {
        const statsJSON = stats.toJson("verbose");
        const formatted = formatWebpackMessages(statsJSON);
        logger.info(
            `webpack ${options.name} built ${statsJSON.hash} in ${statsJSON.time}ms`,
        );
        if (formatted) {
            if (stats.hasErrors()) {
                logger.error(formatted.errors);
                logger.error("compiled with errors");
            } else if (stats.hasWarnings()) {
                logger.warn(formatted.warnings);
                logger.warn("compiled with warnings");
            } else {
                // @todo print file and gzip sizes
                logger.success("compiled successfully");
            }
        } else {
            logger.error("failed to retrieve webpack stats");
        }
    }

    return {
        fromStats,
    };
}

async function Server(compiler: Compiler, config: Config) {
    const app = express();
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

    let serverRefreshCount = 0;
    const webpackHotServerMiddleware = createWebpackHotServerMiddleware(
        compiler,
        {
            done: stats => {
                const fileReporter = FileReporter({
                    name: "client",
                });
                if (serverRefreshCount) {
                    logger.info("---------- Rebuilding ----------");
                } else {
                    logger.info("---------- Creating ----------");
                }
                fileReporter.fromStats(stats);
                serverRefreshCount++;
            },
            error: error => {
                logger.error(error.message);
            },
        },
    );

    let clientRefreshCount = 0;
    const webpackReactAssetMiddleware = createWebpackReactAssetMiddleware(
        compiler,
        {
            done: stats => {
                const fileReporter = FileReporter({
                    name: "server",
                });

                if (clientRefreshCount) {
                    logger.info("---------- Rebuilding ----------");
                } else {
                    logger.info("---------- Creating ----------");
                }
                fileReporter.fromStats(stats);
                clientRefreshCount++;
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
    logger.info(`---------- Connecting Server ----------`);
    return new Promise<number>((resolve, reject) => {
        try {
            const normalizeUrl = (item: string) =>
                item.replace(/([^:]\/)\/+/g, "$1");
            const baseUrl = normalizeUrl(
                `${config.protocol}://${config.host}:${config.port}/${config.path}`,
            );
            app.listen(config.port, config.host, () => {
                logger.success(`Started on ${baseUrl}`);
                return resolve(0);
            });
        } catch (err) {
            return reject(err);
        }
    });
}

export { getServer, Server };
