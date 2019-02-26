import { PixelOvenRunContext } from "@pixeloven/cli";
import { BuildOptions } from "@pixeloven/webpack-config";

export type WebpackExtension = (options: BuildOptions) => Promise<number>;
export type WebpackDevServerExtension = (args?: string[]) => Promise<number>;

export interface AddonWebpackRunContext extends PixelOvenRunContext {
    webpack: WebpackExtension;
    webpackDevServer: WebpackDevServerExtension;
}
