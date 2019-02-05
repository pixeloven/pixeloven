import { exit, handleError, normalizeUrl } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import http from "http";
import config from "./config";
import Server from "./Server";

interface State {
    serverInstance?: http.Server
}

/**
 * Map index to "script"
 * @param index
 */
const mapScriptIndex = (index: string) => index === "start";

/**
 * Setup execution
 */
const main = (argv: string[]) => {
    const scriptArgs = argv.slice(2);
    const scriptIndex = scriptArgs.findIndex(index => mapScriptIndex(index));
    const scriptName =
        scriptIndex === -1 ? scriptArgs[0] : scriptArgs[scriptIndex];
    if (scriptIndex === -1) {
        logger.error(`Unknown script ${scriptName}.`);
        exit(1);
    } else {
        /**
         * @todo can we use any of this https://github.com/glenjamin/ultimate-hot-reloading-example
         * @todo bring this back https://github.com/gaearon/react-hot-loader
         * 
         * @todo 1) Create CLI options for --open (auto-open)
         * @todo 2) Create CLI options for --choose-port (auto-choose-port)
         */
        try {
            const state: State = {};
            const compiler = Compiler.create([
                webpackClientConfig(process.env),
                webpackServerConfig(process.env),
            ]);
    
            /**
             * When compiler is complete print basic stats
             * @todo Refresh server if server path files have been touched
             * @todo Improve logging across all middleware
             * @todo print access like storybook
             * 
             * @todo FIX client onDone runs twice which means we are compile an extra time :(
             */
            compiler.onDone("client", (stats) => {
                const json = stats.toJson("normal");
                logger.info(`Webpack built client ${json.hash} in ${json.time}ms`);
            });
            compiler.onDone("server", (stats) => {
                const json = stats.toJson("normal");
                logger.info(`Webpack built server ${json.hash} in ${json.time}ms`);

                // TODO in here let's look to see if any files in src/server have change and if so restart server
                if (state.serverInstance) {
                    logger.info("RESTARTING");
                }
            });
            logger.info(`Attempting to bind to ${config.host}:${config.port}`);
            /**
             * Create and start application
             */
            const baseUrl = normalizeUrl(
                `${config.protocol}://${config.host}:${config.port}/${
                    config.path
                }`,
            );
            const server = new Server(compiler, config);
            server.create().then(app => {
                state.serverInstance = app.listen(config.port, config.host, () => {
                    logger.info("Starting development server...");
                    logger.info(`Application created at: ${baseUrl}`);
                });
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export default main;
