import { PixelOvenParameters, PixelOvenToolbox } from "@pixeloven/cli";

/**
 * @todo Extend these in WebPack and use them throughout the CLI
 */
export enum ErrorCode {
    InvalidArgument = 1,
    InvalidTask,
    MissingTask,
    MissingTarget,
}

interface RunResponse {
    stdout?: Buffer | string;
    status: number;
    error?: Error;
}

interface GetArgListOptions {
    offset: number;
    type: "default" | "withOptions";
}

type GetArgListFunction = (
    cmd: string,
    parameters: PixelOvenParameters,
    options: GetArgListOptions,
) => string[];

type RunFunction = (args: string[]) => Promise<RunResponse>;

export interface PixelOvenExtensions {
    getArgList: GetArgListFunction;
    run: RunFunction;
}

export type JestExtension = (args: string[]) => Promise<RunResponse>;
export type PrettierExtension = (args: string[]) => Promise<RunResponse>;
export type StyleLintExtension = (args: string[]) => Promise<RunResponse>;
export type TsLintExtension = (args: string[]) => Promise<RunResponse>;
export type TscExtension = (args: string[]) => Promise<RunResponse>;
export type TypeDocExtension = (args: string[]) => Promise<RunResponse>;

export interface PixelOvenCoreToolbox extends PixelOvenToolbox {
    jest: JestExtension;
    pixelOven: PixelOvenExtensions;
    prettier: PrettierExtension;
    styleLint: StyleLintExtension;
    tsc: TscExtension;
    tsLint: TsLintExtension;
    typeDoc: TypeDocExtension;
}
