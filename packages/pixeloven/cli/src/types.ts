import { GluegunCommand, GluegunParameters, GluegunToolbox } from "gluegun";

interface GetArgListOptions {
    offset: number;
    type: "default" | "withOptions";
}

export type GetArgListFunction = (
    cmd: string,
    parameters: GluegunParameters,
    options: GetArgListOptions,
) => string[];

export interface RunResponse {
    stdout?: Buffer | string;
    status: number;
    error?: Error;
}

export type RunFunction = (args: string[]) => Promise<RunResponse>;

export interface PixelOvenExtensions {
    getArgList: GetArgListFunction;
    run: RunFunction;
}
export interface PixelOvenOptions {
    [key: string]: string | number | boolean;
}

export interface PixelOvenToolbox extends GluegunToolbox {
    config: PixelOvenOptions;
    pixelOven: PixelOvenExtensions;
}

export type PixelOvenCommand = GluegunCommand<PixelOvenToolbox>;
