import getBundler from "@pixeloven-webpack/bundler";
import getCompiler from "@pixeloven-webpack/compiler";
import getServer from "@pixeloven-webpack/server";
import {
    AddonWebpackToolbox,
    WebpackExtensionOptions,
    WebpackExtensionType,
} from "../types";

export default (toolbox: AddonWebpackToolbox) => {
    const webpack = async (options: WebpackExtensionOptions) => {
        const { print } = toolbox;
        try {
            const compiler = getCompiler(options.compilerOptions);
            switch (options.type) {
                case WebpackExtensionType.build: {
                    return await getBundler(compiler, {
                        clean: true,
                        outputPath: options.compilerOptions.outputPath,
                    });
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
