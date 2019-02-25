import runner from "@pixeloven/webpack";
import { BuildOptions } from "@pixeloven/webpack-config";
import { AddonWebpackRunContext, WebpackExtension } from "../types";

/**
 * @todo Move runner contents into here
 */
export default (context: AddonWebpackRunContext) => {
    const webpack: WebpackExtension = async (options: BuildOptions) => {
        const { pixelOven } = context;
        const pluginPath = pixelOven.resolvePlugin("@pixeloven", "webpack");
        if (!pluginPath) {
            throw new Error("Could not find peer dependency @pixeloven/webpack");
        }
        return runner(options);
    };
    context.webpack = webpack;
};
