import runner from "@pixeloven/webpack-dev-server";
import { AddonWebpackRunContext, WebpackDevServerExtension } from "../types";

export default (context: AddonWebpackRunContext) => {
    const webpackDevServer: WebpackDevServerExtension = async () => {
        const { pixelOven } = context;
        const pluginPath = pixelOven.resolvePlugin(
            "@pixeloven",
            "webpack-dev-server",
        );
        if (!pluginPath) {
            throw new Error(
                "Could not find peer dependency @pixeloven/webpack-dev-server",
            );
        }
        return runner();
    };
    context.webpackDevServer = webpackDevServer;
};
