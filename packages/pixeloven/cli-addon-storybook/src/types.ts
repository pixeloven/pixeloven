import { PixelOvenToolbox } from "@pixeloven/cli";

export enum StorybookExecutionType {
    build = "build",
    start = "start",
}

export interface StorybookExtensionOptions {
    outputDir?: string;
    port?: number;
    noQuiet?: boolean;
}

export type StorybookExtension = (
    type: StorybookExecutionType,
    options: StorybookExtensionOptions,
) => Promise<number>;

export interface AddonStorybookToolbox extends PixelOvenToolbox {
    storybook: StorybookExtension;
}
