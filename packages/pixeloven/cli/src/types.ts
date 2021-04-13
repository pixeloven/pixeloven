import { GluegunParameters, GluegunToolbox } from "gluegun";

export enum ErrorCode {
    InvalidArgument = 1,
    InvalidTask,
    MissingTask,
    MissingTarget,
}

export type PixelOvenParameters = GluegunParameters;

export interface PixelOvenOptions {
    [key: string]: string | number | boolean;
}

export interface PixelOvenToolbox extends GluegunToolbox {
    config: PixelOvenOptions;
    parameters: PixelOvenParameters;
}
