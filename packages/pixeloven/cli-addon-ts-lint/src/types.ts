import { PixelOvenToolbox } from "@pixeloven/cli";

interface RunResponse {
    stdout?: Buffer | string;
    status: number;
    error?: Error;
}

export type StyleLintExtension = (args: string[]) => Promise<RunResponse>;
export type TsLintExtension = (args: string[]) => Promise<RunResponse>;

export interface AddonGhPagesToolbox extends PixelOvenToolbox {
    styleLint: StyleLintExtension;
    tsLint: TsLintExtension;
}
