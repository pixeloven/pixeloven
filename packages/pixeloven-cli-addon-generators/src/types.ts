import { PixelOvenToolbox } from "@pixeloven/cli";

export enum AtomicDesignType {
    "atom" = 1,
    "molecule" = 2,
    "organism" = 3,
    "page" = 4,
    "partial" = 5,
    "template" = 6,
}

export enum ProgrammingParadigmType {
    "functional" = 1,
    "classical" = 2
}

export interface CreateComponentOptions {
    componentAtomicType: AtomicDesignType;
    componentParadigmType: ProgrammingParadigmType;
    componentHasState: boolean;
    componentHasStyle: boolean;
    componentName: string;
}

export type CreateComponentExtension = (options: CreateComponentOptions) => Promise<void>;

export interface AddonGeneratorsToolbox extends PixelOvenToolbox {
    createComponent: CreateComponentExtension;
}

