import { normalizeUrl } from "@pixeloven/core";
import { Build } from "@pixeloven/webpack";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import { Server } from "@pixeloven/webpack-dev-server";
import { createConfig } from "../config";
import {
    AddonWebpackRunContext,
    WebpackExtensionOptions,
    WebpackExtensionType,
} from "../types";

/**
 * @todo can we use any of this https://github.com/glenjamin/ultimate-hot-reloading-example
 * @todo bring this back https://github.com/gaearon/react-hot-loader
 * @todo FIX client onDone runs twice which means we are compile an extra time :(
 * @todo 1) Create CLI options for --open (auto-open)
 * @todo 2) Create CLI options for --choose-port (auto-choose-port)
 * @todo 3) Create CLI options for --machine (host|docker|virtual)
 *
 * @todo Make build and dev-server configurable through CLI.
 */
export default (context: AddonWebpackRunContext) => {
    const webpack = async (options: WebpackExtensionOptions) => {
        const { print } = context;
        const getCompile = () => {
            return Compiler.create([
                webpackClientConfig(process.env, options.configOptions),
                webpackServerConfig(process.env, options.configOptions),
            ]);
        };
        try {
            switch (options.type) {
                case WebpackExtensionType.build: {
                    const webpackCompiler = getCompile();
                    const build = new Build(webpackCompiler, {
                        path: "./dist", // TODO configurable
                    });
                    await build.client();
                    await build.server();
                }
                case WebpackExtensionType.start: {
                    const webpackCompiler = getCompile();
                    const serverConfig = createConfig();
                    const baseUrl = normalizeUrl(
                        `${serverConfig.protocol}://${serverConfig.host}:${
                            serverConfig.port
                        }/${serverConfig.path}`,
                    );
                    print.info(`Connecting server...`);
                    const server = new Server(webpackCompiler, serverConfig);
                    server.create().then(app => {
                        app.listen(serverConfig.port, serverConfig.host, () => {
                            print.success(`Started on ${baseUrl}`);
                        });
                    });
                }
            }
            return 0;
        } catch (err) {
            if (err && err.message) {
                print.error(err.message);
            }
            return 1;
        }
    };
    context.webpack = webpack;
};
