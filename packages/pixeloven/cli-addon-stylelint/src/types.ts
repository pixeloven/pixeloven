import { PixelOvenToolbox } from "@pixeloven/cli";

interface RunResponse {
    stdout?: Buffer | string;
    status: number;
    error?: Error;
}

export type StyleLintExtension = (args: string[]) => Promise<RunResponse>;

export interface AddonStyleLintToolbox extends PixelOvenToolbox {
    styleLint: StyleLintExtension;
}
