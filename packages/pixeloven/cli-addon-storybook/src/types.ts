import { PixelOvenToolbox } from "@pixeloven/cli";

export enum StorybookExecutionType {
    build = "build",
    start = "start",
}

export type StorybookExtension = (
    type: StorybookExecutionType,
    args?: string[],
) => Promise<number>;

export interface AddonStorybookRunContext extends PixelOvenToolbox {
    storybook: StorybookExtension;
}
