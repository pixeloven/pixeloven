import { GluegunRunContext } from "gluegun";
import { PixelOvenExtensions } from "./extensions/pixeloven";
import { PrettierExtension } from "./extensions/prettier";
import { StyleLintExtension } from "./extensions/style-lint";
import { TsLintExtension } from "./extensions/ts-lint";

export interface PixelOvenRunContext extends GluegunRunContext {
    pixeloven: PixelOvenExtensions;
    prettier: PrettierExtension;
    styleLint: StyleLintExtension,
    tsLint: TsLintExtension;
}