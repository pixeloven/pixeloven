export enum Target{
    web = "web",
    node = "node"
}

export enum TargetName {
    client = "client",
    server = "server",
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
