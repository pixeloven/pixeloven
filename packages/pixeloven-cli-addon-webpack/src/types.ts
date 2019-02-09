import { PixelOvenRunContext } from "@pixeloven/cli";
import { WebpackExtension } from "./extensions/webpack";
import { WebpackDevServerExtension } from "./extensions/webpack-dev-server";

export interface AddonWebpackRunContext extends PixelOvenRunContext {
    webpack: WebpackExtension;
    webpackDevServer: WebpackDevServerExtension;
}