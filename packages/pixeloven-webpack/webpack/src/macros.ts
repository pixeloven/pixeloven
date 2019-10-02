import {
    Config as CompilerConfig,
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";

import { Build, Config as BuildConfig } from "@pixeloven-webpack/bundler";
import { Compiler } from "@pixeloven-webpack/compiler";
import {
    Config as ServerConfig,
    Protocol,
    Server,
} from "@pixeloven-webpack/server";
/**
 * @todo Unify params for build and dev server
 * @todo Should we set ENV here? Or should this be up to the application?
 */

/**
 * Default compiler options
 */
const defaultBuildOptions: BuildConfig = {
    outputPath: "./dist",
};

/**
 * Default compiler options
 */
const defaultCompilerOptions: CompilerConfig = {
    outputPath: "./dist",
    path: "/",
    withProfiling: false,
    withSourceMap: false,
    withStats: false,
    withStatsDir: "./stats",
    withStatsHost: "localhost",
    withStatsPort: 8081,
};

/**
 * Default compiler options
 */
const defaultServerOptions: ServerConfig = {
    host: "localhost",
    ignored: /node_modules/,
    path: "/",
    poll: 500,
    port: 8080,
    protocol: Protocol.http,
};

/**
 * Cleanup and merge options
 * @param defaults
 * @param options
 */
function mergeOptions<T>(defaults: T, options: Partial<T>): T {
    Object.keys(options).forEach(key => {
        if (options[key] === undefined) {
            delete options[key];
        }
    });
    return {
        ...defaults,
        ...options,
    };
}

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
export function getBuilder(
    compiler: Compiler,
    options: Partial<BuildConfig> = {},
) {
    const config = mergeOptions(defaultBuildOptions, options);
    return new Build(compiler, config);
}

/**
 * Returns a compiler with our custom configuration
 * @param options
 */
export function getCompiler(options: Partial<CompilerConfig> = {}) {
    const config = mergeOptions(defaultCompilerOptions, options);
    return Compiler.create([
        webpackClientConfig(process.env, config),
        webpackServerConfig(process.env, config),
    ]);
}

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
export function getServer(
    compiler: Compiler,
    options: Partial<ServerConfig> = {},
) {
    const config = mergeOptions(defaultServerOptions, options);
    return new Server(compiler, config);
}
