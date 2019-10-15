import { Mode, Name, Target } from "@pixeloven-core/env";

export interface Config {
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

export interface Options extends Config {
    mode: Mode;
    name: Name;
    target: Target;
}
