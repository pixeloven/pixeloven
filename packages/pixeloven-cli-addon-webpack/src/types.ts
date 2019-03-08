import { PixelOvenRunContext } from "@pixeloven/cli";
import { ConfigOptions } from "@pixeloven/webpack-config";

export enum WebpackExtensionType {
    build = "build",
    start = "start",
}

export interface WebpackExtensionOptions {
    type: WebpackExtensionType;
    configOptions: ConfigOptions;
}
export type WebpackExtension = (
    options: WebpackExtensionOptions,
) => Promise<number>;

export interface AddonWebpackRunContext extends PixelOvenRunContext {
    webpack: WebpackExtension;
}
