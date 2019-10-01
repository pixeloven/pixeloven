import { PixelOvenToolbox } from "@pixeloven/cli";

export enum ProjectType {
    New,
    Existing,
}

export enum GeneratorType {
    App,
    Component,
    Package,
}

export type GeneratorStrings = keyof typeof GeneratorType;

export enum AtomicDesignType {
    Atom,
    Molecule,
    Organism,
    Page,
    Partial,
    Template,
}

export type AtomicDesignTypeStrings = keyof typeof AtomicDesignType;

export enum ProgrammingParadigm {
    Functional,
    Classical,
}

export type ProgrammingParadigmStrings = keyof typeof ProgrammingParadigm;

export interface CreateOptions {
    generatorType: GeneratorStrings;
}

export interface CreateComponentOptions {
    componentAtomicType: AtomicDesignTypeStrings;
    componentDescription: string;
    componentParadigmType: ProgrammingParadigmStrings;
    componentHasState: boolean;
    componentHasStyle: boolean;
    componentName: string;
}

export type CreateComponentExtension = (
    options: CreateComponentOptions,
) => Promise<void>;

export interface AddonGeneratorsToolbox extends PixelOvenToolbox {
    createComponent: CreateComponentExtension;
}
