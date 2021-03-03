import { PixelOvenToolbox } from "@pixeloven/cli";

interface RunResponse {
    stdout?: Buffer | string;
    status: number;
    error?: Error;
}

export type TsLintExtension = (args: string[]) => Promise<RunResponse>;

export interface AddonTsLintToolbox extends PixelOvenToolbox {
    tsLint: TsLintExtension;
}
