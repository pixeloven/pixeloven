import getBundler from "@pixeloven-webpack/bundler";
import getCompiler from "@pixeloven-webpack/compiler";
import getServer from "@pixeloven-webpack/server";
import {
    AddonWebpackToolbox,
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
export default (toolbox: AddonWebpackToolbox) => {
    const webpack = async (options: WebpackExtensionOptions) => {
        const { print } = toolbox;
        try {
            const compiler = getCompiler(options.compilerOptions);
            switch (options.type) {
                case WebpackExtensionType.build: {
                    let statusCode = 0;
                    statusCode += await getBundler(compiler, {
                        clean: true,
                        outputPath: options.compilerOptions.outputPath,
                    });
                    statusCode += await getBundler(compiler, {
                        clean: false,
                        outputPath: `${options.compilerOptions.outputPath}/public`,
                    });
                    return statusCode;
                }
                case WebpackExtensionType.start: {
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
    toolbox.webpack = webpack;
};
