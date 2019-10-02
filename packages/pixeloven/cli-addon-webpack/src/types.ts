import { Config as BuildConfig } from "@pixeloven-webpack/build";
import { PixelOvenToolbox } from "@pixeloven/cli";
import { Config as CompilerConfig } from "@pixeloven/webpack-config";
import { Config as ServerConfig } from "@pixeloven/webpack-dev-server";

export enum WebpackExtensionType {
    build = "build",
    start = "start",
}

export interface WebpackExtensionOptions {
    type: WebpackExtensionType;
    buildOptions?: BuildConfig;
    compilerOptions?: CompilerConfig;
    serverOptions?: ServerConfig;
}
export type WebpackExtension = (
    options: WebpackExtensionOptions,
) => Promise<number>;

export interface AddonWebpackToolbox extends PixelOvenToolbox {
    webpack: WebpackExtension;
}
