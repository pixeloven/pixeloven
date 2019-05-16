import { GluegunCommand, GluegunParameters, GluegunToolbox } from "gluegun";

interface GetArgListOptions {
    offset: number;
    type: "default" | "withOptions";
}

export type JestExtension = (args?: string[]) => Promise<RunResponse>;
export type PrettierExtension = (args?: string[]) => Promise<RunResponse>;
export type StyleLintExtension = (args?: string[]) => Promise<RunResponse>;
export type TsLintExtension = (args?: string[]) => Promise<RunResponse>;
export type TscExtension = (args?: string[]) => Promise<RunResponse>;
export type TypeDocExtension = (args?: string[]) => Promise<RunResponse>;

export type GetArgListFunction = (
    cmd: string,
    parameters: GluegunParameters,
    options: GetArgListOptions,
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
export interface PixelOvenOptions {
    [key: string]: string | number | boolean;
}

export interface PixelOvenToolbox extends GluegunToolbox {
    config: PixelOvenOptions
    jest: JestExtension;
    pixelOven: PixelOvenExtensions;
    prettier: PrettierExtension;
    styleLint: StyleLintExtension;
    tsc: TscExtension;
    tsLint: TsLintExtension;
    typeDoc: TypeDocExtension;
}

export type PixelOvenCommand = GluegunCommand<PixelOvenToolbox>;
