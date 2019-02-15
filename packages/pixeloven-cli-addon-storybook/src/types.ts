import { PixelOvenRunContext } from "@pixeloven/cli";
import { StorybookExtension } from "./extensions/storybook";

export interface AddonStorybookRunContext extends PixelOvenRunContext {
    storybook: StorybookExtension;
}
