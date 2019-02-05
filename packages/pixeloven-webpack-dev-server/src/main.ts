import { exit, handleError, normalizeUrl } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import config from "./config";
import Server from "./Server";

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
         * @todo FIX client onDone runs twice which means we are compile an extra time :(
         * @todo 1) Create CLI options for --open (auto-open)
         * @todo 2) Create CLI options for --choose-port (auto-choose-port)
         * @todo 3) Create CLI options for --machine (host|docker|virtual)
         */
        try {
            logger.info(`Starting compiler...`);
            const compiler = Compiler.create([
                webpackClientConfig(process.env),
                webpackServerConfig(process.env),
            ]);
            /**
             * Create application server
             */
            const baseUrl = normalizeUrl(
                `${config.protocol}://${config.host}:${config.port}/${
                    config.path
                }`,
            );
            logger.info(`Connecting server...`);
            const server = new Server(compiler, config);
            server.create().then(app => {
                app.listen(config.port, config.host, () => {
                    logger.info(`Started on ${baseUrl}`);
                });
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export default main;
