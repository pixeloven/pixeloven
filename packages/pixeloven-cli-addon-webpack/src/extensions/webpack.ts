import { Build } from "@pixeloven/webpack";
import { Compiler } from "@pixeloven/webpack-compiler";
import { BuildOptions, webpackClientConfig, webpackServerConfig } from "@pixeloven/webpack-config";
import { AddonWebpackRunContext, WebpackExtension } from "../types";

/**
 * @todo can we use any of this https://github.com/glenjamin/ultimate-hot-reloading-example
 * @todo bring this back https://github.com/gaearon/react-hot-loader
 * @todo FIX client onDone runs twice which means we are compile an extra time :(
 * @todo 1) Create CLI options for --open (auto-open)
 * @todo 2) Create CLI options for --choose-port (auto-choose-port)
 * @todo 3) Create CLI options for --machine (host|docker|virtual)
 */
export default (context: AddonWebpackRunContext) => {
    const webpack: WebpackExtension = async (options: BuildOptions) => {
        const { print } = context;
        try {
            print.info("Initializing Webpack Compiler");
            const compiler = Compiler.create([
                webpackClientConfig(process.env, {
                    withSourceMap: true,
                }),
                webpackServerConfig(process.env, {
                    withSourceMap: true,
                }),
            ]);
            const build = new Build(compiler, {
                path: "./dist"
            });
            await build.client();
            await build.server();
            return 0
        } catch(err) {
            print.error(err.message);
            return 1;
        }
    };
    context.webpack = webpack;
};
