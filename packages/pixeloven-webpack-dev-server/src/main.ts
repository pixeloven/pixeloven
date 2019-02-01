import { exit, handleError, normalizeUrl } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import openBrowser from "react-dev-utils/openBrowser";
import WebpackDevServerUtils from "react-dev-utils/WebpackDevServerUtils";
import config from "./config";
import Server from "./Server";

/**
 * Get WebpackDevServerUtils functions
 */
const { choosePort } = WebpackDevServerUtils;

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
        const compiler = Compiler.create([
            webpackClientConfig(process.env),
            webpackServerConfig(process.env),
        ]);

        /**
         * When compiler is complete print basic stats
         * @todo Refresh server if server path files have been touched
         * @todo Stream json for client and server to browser
         * @todo print access like storybook
         */
        compiler.onDone("client").then(stats => {
            /**
             * @todo this is handled by the client middleware - would like to move reporting here
             */
            const json = stats.toJson("normal");
            logger.info(`webpack built client ${json.hash} in ${json.time}ms`);
        });
        compiler.onDone("server").then(stats => {
            const json = stats.toJson("normal");
            logger.info(`webpack built server ${json.hash} in ${json.time}ms`);
        });

        /**
         * @todo can we use any of this https://github.com/glenjamin/ultimate-hot-reloading-example
         * @todo bring this back https://github.com/gaearon/react-hot-loader
         */
        try {
            /**
             * We attempt to use the default port but if it is busy, we offer the user to
             * run on a different port. `choosePort()` Promise resolves to the next free port.
             */
            const host = config.host;
            const port = config.port;
            const protocol = config.protocol;
            choosePort(host, port)
                .then((chosenPort: number) => {
                    logger.info(`Attempting to bind to ${host}:${chosenPort}`);
                    config.port = chosenPort;
                    const server = new Server(compiler, config);
                    /**
                     * @todo Need a better way to do this
                     */
                    server.start((error?: Error) => {
                        if (error) {
                            handleError(error);
                        }
                        logger.info("Starting development server...");
                        if (config.machine === "host") {
                            logger.info(
                                "Application will launch automatically.",
                            );
                            const baseUrl = normalizeUrl(
                                `${protocol}://${host}:${chosenPort}/${
                                    config.path
                                }`,
                            );
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
    }
};

export default main;
