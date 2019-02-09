import runner from "@pixeloven/webpack";
import { AddonWebpackRunContext } from "../types";

export type WebpackExtension = (args?: string[]) => Promise<number>;

export default (context: AddonWebpackRunContext) => {
    const webpack = async (args: string[] = []) => {
        const { pixeloven } = context;
        const pluginPath = pixeloven.resolvePlugin("@pixeloven", "webpack");
        if (!pluginPath) {
            throw new Error("Could not find peer dependency @pixeloven/webpack");
        }
        return runner();
    };
    context.webpack = webpack;
};
