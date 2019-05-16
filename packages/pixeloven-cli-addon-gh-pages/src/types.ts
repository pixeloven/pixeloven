import { PixelOvenToolbox, RunResponse } from "@pixeloven/cli";

export type GhPagesExtension = (args?: string[]) => Promise<RunResponse>;

export interface AddonGhPagesRunContext extends PixelOvenToolbox {
    ghPages: GhPagesExtension;
}
