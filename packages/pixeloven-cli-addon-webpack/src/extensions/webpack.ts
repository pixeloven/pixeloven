import { getBuilder, getCompiler, getServer } from "@pixeloven/webpack";
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
        const { pixelOven, print } = context;
        const pluginPath = pixelOven.resolvePlugin("@pixeloven", "webpack");
        if (!pluginPath) {
            throw new Error(
                "Could not find peer dependency @pixeloven/webpack",
            );
        }
        try {
            switch (options.type) {
                case WebpackExtensionType.build: {
                    const compiler = getCompiler(options.compilerOptions);
                    const builder = getBuilder(compiler, {
                        path: "./dist", // TODO configurable
                    });
                    let statusCode = 0;
                    statusCode += await builder.client();
                    statusCode += await builder.server();
                    return statusCode;
                }
                case WebpackExtensionType.start: {
                    const compiler = getCompiler(options.compilerOptions);
                    print.info(`Connecting server...`);
                    const server = getServer(compiler, options.serverOptions);
                    return await server.start();
                }
            }
        } catch (err) {
            if (err && err.message) {
                print.error(err.message);
            }
        }
        return 1;
    };
    context.webpack = webpack;
};
