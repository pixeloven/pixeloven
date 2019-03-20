import { GluegunParameters, GluegunRunContext } from "gluegun";

type ArgType = "default" | "withOptions";

export type JestExtension = (args?: string[]) => Promise<RunResponse>;
export type PrettierExtension = (args?: string[]) => Promise<RunResponse>;
export type StyleLintExtension = (args?: string[]) => Promise<RunResponse>;
export type TsLintExtension = (args?: string[]) => Promise<RunResponse>;
export type TscExtension = (args?: string[]) => Promise<RunResponse>;
export type TypeDocExtension = (args?: string[]) => Promise<RunResponse>;

export type GetArgListFunction = (
    cmd: string,
    parameters: GluegunParameters,
    index?: number,
    type?: ArgType,
) => string[];

export type GetConfigPathFunction = (
    fileName: string,
    strict?: boolean,
) => string | false;

export type ResolvePluginFunction = (...paths: string[]) => string | false;

export interface RunResponse {
    stdout?: Buffer | string;
    status: number;
    error?: Error;
}

export type RunFunction = (args: string[]) => Promise<RunResponse>;

export interface PixelOvenExtensions {
    getArgList: GetArgListFunction;
    getConfigPath: GetConfigPathFunction;
    resolvePlugin: ResolvePluginFunction;
    run: RunFunction;
}

export interface PixelOvenRunContext extends GluegunRunContext {
    jest: JestExtension;
    pixelOven: PixelOvenExtensions;
    prettier: PrettierExtension;
    styleLint: StyleLintExtension;
    tsc: TscExtension;
    tsLint: TsLintExtension;
    typeDoc: TypeDocExtension;
}
