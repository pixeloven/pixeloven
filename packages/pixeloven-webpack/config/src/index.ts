import {Mode, Name, Target} from "@pixeloven-core/env";
import { config } from "./common";
import { Config} from "./types";

/**
 * Shims old CLI options with new configuration
 * @param env 
 * @param options 
 * @param name 
 * @param target 
 */
function shimOptions(env: NodeJS.ProcessEnv, options: Config, name: Name, target: Target) {
    const nodeEnv = env.NODE_ENV || "production";
    return {
        mode: Mode.hasOwnProperty(nodeEnv) ? Mode[nodeEnv] : Mode.production,
        name,
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
        target,
    }
}

/**
 * Configuration for client webpack bundling. This is here to support the old CLI style so we can transition to a new setup.
 * @param env 
 * @param options 
 */
function webpackClientConfig(env: NodeJS.ProcessEnv, options: Config) {
    return config(shimOptions(env, options, Name.client, Target.web));
}

/**
 * Configuration for client webpack bundling. This is here to support the old CLI style so we can transition to a new setup.
 * @param env 
 * @param options 
 */
function webpackServerConfig(env: NodeJS.ProcessEnv, options: Config) {
    return config(shimOptions(env, options, Name.server, Target.node));
}

export {
    Config,
    webpackClientConfig,
    webpackServerConfig,
}
