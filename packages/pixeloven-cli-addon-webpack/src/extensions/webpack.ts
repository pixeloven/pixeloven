import runner from "@pixeloven/webpack";
import { BuildOptions } from "@pixeloven/webpack-config";
import { AddonWebpackRunContext } from "../types";

export type WebpackExtension = (options: BuildOptions) => Promise<number>;

/**
 * @todo Move runner contents into here
 */
export default (context: AddonWebpackRunContext) => {
    const webpack = async (options: BuildOptions) => {
        const { pixeloven } = context;
        const pluginPath = pixeloven.resolvePlugin("@pixeloven", "webpack");
        if (!pluginPath) {
            throw new Error("Could not find peer dependency @pixeloven/webpack");
        }
        return runner(options);
    };
    context.webpack = webpack;
};
