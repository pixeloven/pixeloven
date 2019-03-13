import { Build, Config as BuildConfig } from "@pixeloven/webpack-builder";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    Config as CompilerConfig,
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import {
    Config as ServerConfig,
    Protocol,
    Server,
} from "@pixeloven/webpack-dev-server";

/**
 * @todo Unify params for build and dev server
 * @todo Should we set ENV here? Or should this be up to the application?
 */

/**
 * Default compiler options
 */
const defaultBuildOptions = {
    outputPath: "./dist",
};

/**
 * Default compiler options
 */
const defaultCompilerOptions = {
    outputPath: "./dist",
    path: "/",
    withSourceMap: false,
};

/**
 * Default compiler options
 */
const defaultServerOptions = {
    host: "localhost",
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
    console.log(config);
    return new Server(compiler, config);
}
