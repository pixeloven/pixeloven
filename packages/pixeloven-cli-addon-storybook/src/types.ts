import { PixelOvenRunContext, RunResponse } from "@pixeloven/cli";

export type StorybookExecutionType = "build" | "start";

export type StorybookExtension = (type: StorybookExecutionType, args?: string[]) => Promise<RunResponse>;

export interface AddonStorybookRunContext extends PixelOvenRunContext {
    storybook: StorybookExtension;
}