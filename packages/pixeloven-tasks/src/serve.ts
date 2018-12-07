/**
 * Bootstrap development env
 */
import "./bootstrap/development";

/**
 * Import dependencies
 */
import {
    handleError,
    sleep,
    WebpackStatsHandler,
} from "@pixeloven/core";
import { env } from "@pixeloven/env";
import { logger } from "@pixeloven/node-logger";
import express from "express";
import path from "path";
import openBrowser from "react-dev-utils/openBrowser";
import WebpackDevServerUtils from "react-dev-utils/WebpackDevServerUtils";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import webpackClientConfig from "./configs/webpack/client";
import webpackServerConfig from "./configs/webpack/server";
import {getBaseUrl, getHMRPath, getHost, getPort, getPublicPath} from "./macros";
import errorHandler from "./middleware/errorHandler";

/**
 * Get WebpackDevServerUtils functions
 */
const { choosePort } = WebpackDevServerUtils;

const LOG_LEVEL = env.config("LOG_LEVEL", "info");
const MACHINE = env.config("MACHINE", "host");

const publicPath = getPublicPath();
const baseUrl = getBaseUrl();
const host = getHost();
const port = getPort();
const hmrPath = getHMRPath();

type ServerOnComplete = (error?: Error) => void

/**
 * @todo move this out of here and setup tests
 */
const server = (serverHost: string, serverPort: number, onComplete: ServerOnComplete) => {
    /**
     * Notify user of host binding
     */
    logger.info(
        `Attempting to bind to ${serverHost}`,
    );
    logger.info(
        `If successful the application will launch automatically.`,
    );
    sleep(3000);

    /**
     * Create express application
     * @type {Function}
     */
    const app = express();
    app.use(publicPath, express.static(path.resolve(process.cwd(), "public")));

    /**
     * Setup webpack hot module replacement for development
     */
    const combinedCompiler = webpack([
        webpackClientConfig,
        webpackServerConfig,
    ]);

    /**
     * Setup webpack dev middleware
     * @todo can use the reporter to better handle errors in console (FORMATTING)
     * @todo Should replace the log so we can inject it into reporter
     * @todo Should remove the MACHINE ref in here and make this more configurable
     */
    const watchOptions: webpack.Options.WatchOptions = {
        aggregateTimeout: 200,
        poll: MACHINE !== "host" ? 500 : false
    }
    const webpackDevMiddlewareInstance = webpackDevMiddleware(
        combinedCompiler,
        {
            index: false,
            logLevel: LOG_LEVEL,
            publicPath,
            reporter: (middlewareOptions, reporterOptions) => {
                if (
                    reporterOptions.state &&
                    reporterOptions.stats &&
                    middlewareOptions.logLevel !== "silent"
                ) {
                    const handler = new WebpackStatsHandler(
                        reporterOptions.stats,
                    );
                    const stats = handler.format();
                    if (stats) {
                        if (reporterOptions.stats.hasErrors()) {
                            logger.error(stats.errors);
                            logger.error("Failed to compile.");
                        } else if (
                            reporterOptions.stats.hasWarnings()
                        ) {
                            logger.warn(stats.warnings);
                            logger.warn("Compiled with warnings.");
                        } else {
                            logger.info("Compiled successfully.");
                        }
                    } else {
                        logger.error(
                            "Unexpected Error: Failed to retrieve webpack stats.",
                        );
                    }
                } else {
                    logger.info("Waiting...");
                }
            },
            serverSideRender: true,
            watchOptions,
        },
    );
    app.use(webpackDevMiddlewareInstance);

    /**
     * Setup hot middleware for client & server
     */
    const clientCompiler = combinedCompiler.compilers.find(
        compiler => compiler.name === "client",
    );
    if (clientCompiler) {
        app.use(
            webpackHotMiddleware(clientCompiler, {
                heartbeat: 3000,
                log: logger.info,
                path: hmrPath,
                reload: true,
            }),
        );
    }
    /**
     * Pass express app in as options. Might allow for us to apply settings 
     */
    app.use(webpackHotServerMiddleware(combinedCompiler, {
        serverRendererOptions: {
            app,
        }
    }));

    /**
     * Create error handler for server errors
     * @todo Should render a basic page with the same stack style as the dev-middleware
     */
    app.use(errorHandler);

    /**
     * Start express server on specific host and port
     */
    app.listen(serverPort, serverHost, onComplete);
}

/**
 * @todo can we use any of this https://github.com/glenjamin/ultimate-hot-reloading-example
 * @todo bring this back https://github.com/gaearon/react-hot-loader
 */
try {
    /**
     * We attempt to use the default port but if it is busy, we offer the user to
     * run on a different port. `choosePort()` Promise resolves to the next free port.
     */
    choosePort(host, port)
        .then((chosenPort: number) => {
            server(host, chosenPort, (error?: Error) => {
                if (error) {
                    handleError(error);
                }
                logger.info("Starting development server...");
                if (MACHINE === "host") {
                    openBrowser(baseUrl);
                }
            });
        })
        .catch((error: Error) => {
            handleError(error);
        });
} catch (error) {
    handleError(error);
}
