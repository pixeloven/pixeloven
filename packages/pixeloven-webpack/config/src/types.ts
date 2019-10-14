import {Mode, Name, Target} from "@pixeloven-core/env";

export interface Options {
    mode: Mode;
    name: Name;
    outputPath: string;
    profiling: boolean;
    publicPath: string;
    sourceMap: boolean;
    stats: {
        enabled: boolean;
        host: string;
        outputDir: string;
        port: number;
    },
    target: Target;
}

/**
 * @description General settings for BundleAnalyzerPlugin
 */
interface StatsConfig {
    withStats: boolean;
    withStatsDir: string;
}

/**
 * @description Development server settings for BundleAnalyzerPlugin
 */
interface StatsServerConfig extends StatsConfig {
    withStatsHost: string;
    withStatsPort: number;
}

export interface Config extends StatsServerConfig {
    outputPath: string;
    path: string;
    withProfiling: boolean;
    withSourceMap: boolean;
}
