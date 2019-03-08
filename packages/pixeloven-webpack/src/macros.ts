import { Build, Config as BuildConfig } from "@pixeloven/webpack-builder";
import { Compiler } from "@pixeloven/webpack-compiler";
import {
    Config as CompilerConfig,
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven/webpack-config";
import {
    Config as ServerConfig,
    Machine,
    Protocol,
    Server,
} from "@pixeloven/webpack-dev-server";

/**
 * Default compiler options
 */
const defaultBuildOptions = {
    path: "./dist",
};

/**
 * Default compiler options
 */
const defaultCompilerOptions = {
    buildPath: "./dist",
    publicPath: "/",
    withSourceMap: false,
};

/**
 * Default compiler options
 * @todo Remove machine and replace with something more generic
 */
const defaultServerOptions = {
    host: "localhost",
    machine: Machine.host,
    path: "/",
    port: 8080,
    protocol: Protocol.http,
};

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
export function getBuilder(
    compiler: Compiler,
    options: Partial<BuildConfig> = {},
) {
    /**
     * @todo validate partial
     */
    const config = Object.assign({}, options, defaultBuildOptions);
    return new Build(compiler, config);
}

/**
 * Returns a compiler with our custom configuration
 * @todo move static method into here
 * @param options
 */
export function getCompiler(options: Partial<CompilerConfig> = {}) {
    /**
     * @todo validate partial
     */
    const config = Object.assign({}, options, defaultCompilerOptions);
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
    /**
     * @todo validate partial
     */
    const config = Object.assign({}, options, defaultServerOptions);
    return new Server(compiler, config);
}
