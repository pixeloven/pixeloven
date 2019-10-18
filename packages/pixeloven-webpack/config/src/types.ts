import { Mode, Name, Target } from "@pixeloven-core/env";

interface Shared {
    outputPath: string;
    profiling: boolean;
    publicPath: string;
    sourceMap: boolean;
    stats: {
        enabled: boolean;
        host: string;
        outputDir: string;
        port: number;
    };
}

export interface CompilerConfig {
    entry: string;
    mode: Mode;
    name: Name;
    target: Target;
}

export interface Config extends Shared {
    compilers?: CompilerConfig[];
}

export interface Options extends Config {
    mode: Mode;
    name: Name;
    target: Target;
}
