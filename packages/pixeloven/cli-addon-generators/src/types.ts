import { PixelOvenToolbox } from "@pixeloven/cli";

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
    componentNameSpace: string;
}

export type CreateComponentExtension = (
    options: CreateComponentOptions,
) => Promise<void>;

export interface CreatePackageOptions {
    packageAuthorEmail: string;
    packageAuthorName: string;
    packageDescription: string;
    packageLicense: string;
    packageName: string;
    packageNameSpace?: string;
    packageRegistry?: string;
    packageVersion: number | string;
}

export type CreatePackageExtension = (
    options: CreatePackageOptions,
) => Promise<void>;

export interface CreateAppOptions {
    appAuthorEmail: string;
    appAuthorName: string;
    appDescription: string;
    appLicense: string;
    appName: string;
    appNameSpace?: string;
    appRegistry?: string;
    appVersion: number | string;
}

export type CreateAppExtension = (options: CreateAppOptions) => Promise<void>;

export interface AddonGeneratorsToolbox extends PixelOvenToolbox {
    createApp: CreateAppExtension;
    createComponent: CreateComponentExtension;
    createPackage: CreatePackageExtension;
}
