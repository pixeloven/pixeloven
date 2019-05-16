import { PixelOvenToolbox, RunResponse } from "@pixeloven/cli";

export type StorybookExecutionType = "build" | "start";

export type StorybookExtension = (
    type: StorybookExecutionType,
    args?: string[],
) => Promise<RunResponse>;

export interface AddonStorybookRunContext extends PixelOvenToolbox {
    storybook: StorybookExtension;
}
