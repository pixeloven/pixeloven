import runner from "@pixeloven/webpack-dev-server";
import { AddonWebpackRunContext } from "../types";

export type WebpackDevServerExtension = (args?: string[]) => Promise<number>;

export default (context: AddonWebpackRunContext) => {
    const webpackDevServer = async (args: string[] = []) => {
        const { pixeloven } = context;
        const pluginPath = pixeloven.resolvePlugin("@pixeloven", "webpack-dev-server");
        if (!pluginPath) {
            throw new Error("Could not find peer dependency @pixeloven/webpack-dev-server");
        }
        return runner();
    };
    context.webpackDevServer = webpackDevServer;
};
