import { PixelOvenRunContext } from "@pixeloven/cli";
import { WebpackExtension } from "./extensions/webpack";

export interface AddonWebpackRunContext extends PixelOvenRunContext {
    webpack: WebpackExtension;
}