import { Mode, Name, Target } from "@pixeloven-core/env";

interface Stats {
    enabled: boolean;
    host: string;
    outputDir: string;
    port: number;
}

export interface Options {
    allowExternals: boolean;
    circularDepCheck?: "warn" | "error";
    entry: string;
    mode: Mode;
    name: Name;
    namespace: string;
    staticAssetPath: string;
    outputPath: string;
    profiling: boolean;
    publicPath: string;
    sourceMap: boolean | string;
    stats: Stats;
    target: Target;
}
