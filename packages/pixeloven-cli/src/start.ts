/**
 * Bootstrap development env
 */
import "./bootstrap/development";

/**
 * Import dependencies
 */
import {
  env,
  handleError,
  logger,
  sleep,
  WebpackStatsHandler
} from "@pixeloven/core";
import chalk from "chalk";
import express, { Request, Response } from "express";
import path from "path";
import openBrowser from "react-dev-utils/openBrowser";
import WebpackDevServerUtils from "react-dev-utils/WebpackDevServerUtils";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import webpackClientConfig from "./configs/webpack/client";
import webpackServerConfig from "./configs/webpack/server";

/**
 * Get WebpackDevServerUtils functions
 */
const { choosePort, prepareUrls } = WebpackDevServerUtils;

const PUBLIC_PATH = env.config("PUBLIC_URL", "/");
const DEFAULT_HOST = env.config("HOST", "localhost");
const DEFAULT_PROTOCOL = env.config("PROTOCOL", "http");
const DEFAULT_PORT = parseInt(env.config("PORT", "8080"), 10);

/**
 * @todo for some reason we get a bunch of uncaught exceptions in the browser after re-compile
 * @todo add error handling middleware to catch errors
 */
try {
  /**
   * We attempt to use the default port but if it is busy, we offer the user to
   * run on a different port. `choosePort()` Promise resolves to the next free port.
   */
  choosePort(DEFAULT_HOST, DEFAULT_PORT)
    .then((PORT: number) => {
      /**
       * Notify user of host binding
       */
      const urls = prepareUrls(DEFAULT_PROTOCOL, DEFAULT_HOST, PORT);
      logger.info(
        `Attempting to bind to HOST: ${chalk.cyan(urls.localUrlForBrowser)}`
      );
      logger.info(`If successful the application will launch automatically.`);
      sleep(3000);

      /**
       * Create express application
       * @type {Function}
       */
      const app = express();
      app.use(express.static(path.resolve(process.cwd(), "public")));

      /**
       * Setup webpack hot module replacement for development
       */
      const combinedCompiler = webpack([
        webpackClientConfig,
        webpackServerConfig
      ]);

      /**
       * Setup webpack dev middleware
       * @todo can use the reporter to better handle errors in console (FORMATTING)
       * @todo Should replace the log so we can inject it into reporter
       */
      const webpackDevMiddlewareInstance = webpackDevMiddleware(
        combinedCompiler,
        {
          index: false,
          logLevel: "silent",
          publicPath: PUBLIC_PATH,
          reporter: (middlewareOptions, reporterOptions) => {
            if (
              reporterOptions.state &&
              reporterOptions.stats &&
              middlewareOptions.logLevel !== "silent"
            ) {
              const handler = new WebpackStatsHandler(reporterOptions.stats);
              const stats = handler.format();
              if (stats) {
                if (reporterOptions.stats.hasErrors()) {
                  logger.error(stats.errors);
                  logger.error("Failed to compile.");
                } else if (reporterOptions.stats.hasWarnings()) {
                  logger.warn(stats.warnings);
                  logger.warn("Compiled with warnings.");
                } else {
                  logger.info("Compiled successfully.");
                }
              } else {
                logger.error(
                  "Unexpected Error: Failed to retrieve webpack stats."
                );
              }
            } else {
              logger.info("Compiling...");
            }
          },
          serverSideRender: true
        }
      );
      app.use(webpackDevMiddlewareInstance);

      /**
       * Setup hot middleware for client & server
       */
      const clientCompiler = combinedCompiler.compilers.find(
        compiler => compiler.name === "client"
      );
      if (clientCompiler) {
        app.use(
          webpackHotMiddleware(clientCompiler, {
            log: logger.info
          })
        );
      }
      app.use(webpackHotServerMiddleware(combinedCompiler));

      /**
       * Create error handler for server errors
       * @todo Should render a basic page with the same stack style as the dev-middleware
       */
      app.use((err: Error, req: Request, res: Response) => {
        res
          .status(500)
          .send(
            `<h1>Unexpected Error</h1><p>See console for more details.</p><p>${
              err.message
            }</p>`
          );
      });

      /**
       * Start express server on specific host and port
       */
      app.listen(PORT, DEFAULT_HOST, (error?: Error) => {
        if (error) {
          handleError(error);
        }
        logger.info("Starting development server...");
        openBrowser(urls.localUrlForBrowser);
      });
    })
    .catch((error: Error) => {
      handleError(error);
    });
} catch (error) {
  handleError(error);
}
