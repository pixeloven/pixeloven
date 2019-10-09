export enum Mode {
    development = "development",
    production = "production",
}

export enum Name {
    client = "client",
    server = "server",
}

export enum Target{
    web = "web",
    node = "node"
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
