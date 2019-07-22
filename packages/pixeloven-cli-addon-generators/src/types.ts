import { PixelOvenToolbox } from "@pixeloven/cli";

export interface CreateComponentOptions {
    componentAtomicType: string,
    componentName: string,
}

export type CreateComponentExtension = (options: CreateComponentOptions) => Promise<void>;

export interface AddonGeneratorsToolbox extends PixelOvenToolbox {
    createComponent: CreateComponentExtension;
}

