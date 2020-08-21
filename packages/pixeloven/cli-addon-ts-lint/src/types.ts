import { PixelOvenToolbox } from "@pixeloven/cli";

export enum ErrorCode {
    InvalidArgument = 1,
    InvalidTask,
    FailedBundling,
    FailedClientBundling,
    FailedServerBundling,
    MissingTask,
    MissingTarget,
}

interface RunResponse {
    stdout?: Buffer | string;
    status: number;
    error?: Error;
}

export type StyleLintExtension = (args: string[]) => Promise<RunResponse>;
export type TsLintExtension = (args: string[]) => Promise<RunResponse>;

export interface AddonTsLintToolbox extends PixelOvenToolbox {
    styleLint: StyleLintExtension;
    tsLint: TsLintExtension;
}
