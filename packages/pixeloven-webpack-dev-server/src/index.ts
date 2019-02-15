import { normalizeUrl } from "@pixeloven/core";
import { logger } from "@pixeloven/node-logger";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import { createConfig } from "./config";
import Server from "./Server";

export { Server };

/**
 * Setup execution
 * @todo Move this into utils and cli
 */
export default async () => {
    /**
     * Create configuration
     */
    const config = createConfig();

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
            webpackClientConfig(process.env, {
                withSourceMap: true,
            }),
            webpackServerConfig(process.env, {
                withSourceMap: true,
            }),
        ]);
        /**
         * Create application server
         */
        const baseUrl = normalizeUrl(
            `${config.protocol}://${config.host}:${config.port}/${config.path}`,
        );
        logger.info(`Connecting server...`);
        const server = new Server(compiler, config);
        server.create().then(app => {
            app.listen(config.port, config.host, () => {
                logger.info(`Started on ${baseUrl}`);
            });
        });
        return 0;
    } catch (err) {
        if (err && err.message) {
            logger.error(err.message);
        }
        return 1;
    }
};
