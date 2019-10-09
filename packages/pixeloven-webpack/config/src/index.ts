import { clientConfig, serverConfig } from "./common";
import { Config, Mode, Name, Target} from "./types";

/**
 * @todo Simplify these a little bit. Once tested with the unified config ship that as one PR before doing any CLI work.
 */

/**
 * @todo Clean up CLI options. This is temporary so that I can test the refactor without redoing the entire CLI addon
 * @param env 
 * @param options 
 */
function webpackClientConfig(env: NodeJS.ProcessEnv, options: Config) {
    const nodeEnv = env.NODE_ENV || "production";
    return clientConfig({
        mode: Mode.hasOwnProperty(nodeEnv) ? Mode[nodeEnv] : Mode.production,
        name: Name.client,
        outputPath: options.outputPath,
        profiling: options.withProfiling,
        publicPath: options.path,
        sourceMap: options.withSourceMap,
        stats: {
            enabled: options.withStats,
            host: options.withStatsHost,
            outputDir: options.withStatsDir,
            port: options.withStatsPort,
        },
        target: Target.web,
    });
}

/**
 * @todo Clean up CLI options. This is temporary so that I can test the refactor without redoing the entire CLI addon
 * @param env 
 * @param options 
 */
function webpackServerConfig(env: NodeJS.ProcessEnv, options: Config) {
    const nodeEnv = env.NODE_ENV || "production";
    return serverConfig({
        mode: Mode.hasOwnProperty(nodeEnv) ? Mode[nodeEnv] : Mode.production,
        name: Name.server,
        outputPath: options.outputPath,
        profiling: options.withProfiling,
        publicPath: options.path,
        sourceMap: options.withSourceMap,
        stats: {
            enabled: options.withStats,
            host: options.withStatsHost,
            outputDir: options.withStatsDir,
            port: options.withStatsPort,
        },
        target: Target.node,
    });
}

export {
    Config,
    webpackClientConfig,
    webpackServerConfig,
}
