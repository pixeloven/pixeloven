import { GluegunRunContext } from "gluegun";
import { JestExtension } from "./extensions/jest";
import { PixelOvenExtensions } from "./extensions/pixeloven";
import { PrettierExtension } from "./extensions/prettier";
import { StyleLintExtension } from "./extensions/style-lint";
import { TsLintExtension } from "./extensions/ts-lint";
import { TscExtension } from "./extensions/tsc";
import { TypeDocExtension } from "./extensions/type-doc";

export interface PixelOvenRunContext extends GluegunRunContext {
    jest: JestExtension;
    pixeloven: PixelOvenExtensions;
    prettier: PrettierExtension;
    styleLint: StyleLintExtension;
    tsc: TscExtension;
    tsLint: TsLintExtension;
    typeDoc: TypeDocExtension;
}
