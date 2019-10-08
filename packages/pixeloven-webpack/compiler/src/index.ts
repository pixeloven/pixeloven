import { mergeOptions } from "@pixeloven-core/common";
import {
    Config,
    webpackClientConfig,
    webpackServerConfig,
} from "@pixeloven-webpack/config";
import Compiler from "./Compiler";

/**
 * Default compiler options
 */
const defaultCompilerOptions: Config = {
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
 * Returns a compiler with our custom configuration
 * @param options
 */
function getCompiler(options: Partial<Config> = {}) {
    const config = mergeOptions(defaultCompilerOptions, options);
    return Compiler.create([
        webpackClientConfig(process.env, config),
        webpackServerConfig(process.env, config),
    ]);
}

export default getCompiler;
export { Compiler, Config };
