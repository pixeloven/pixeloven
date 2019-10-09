import { PixelOvenToolbox } from "@pixeloven/cli";

export enum StorybookExecutionType {
    build = "build",
    start = "start",
}

export interface StorybookExecutionOptions {
    outputDir?: string;
    port?: number;
    noQuiet?: boolean;
}

/* Note: keep this enum up to date matching the options interface above for runtime argument checking */
export enum StorybookExecutionOptionTypes {
    outputDir = "outputDir",
    port = "port",
    noQuiet = "noQuiet",
}

export type StorybookExtension = (
    type: StorybookExecutionType,
    options: StorybookExecutionOptions,
) => Promise<number>;

export interface AddonStorybookToolbox extends PixelOvenToolbox {
    storybook: StorybookExtension;
}
