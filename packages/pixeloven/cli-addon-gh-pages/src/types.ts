import { PixelOvenToolbox } from "@pixeloven/cli";

export interface GhPagesExtensionOptions {
    path: string;
}

export type GhPagesExtension = (
    options: GhPagesExtensionOptions,
) => Promise<number>;

export interface AddonGhPagesToolbox extends PixelOvenToolbox {
    ghPages: GhPagesExtension;
}
