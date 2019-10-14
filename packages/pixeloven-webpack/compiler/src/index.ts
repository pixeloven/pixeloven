import { mergeOptions } from "@pixeloven-core/common";
import {Name, Target} from "@pixeloven-core/env";
import {
    Config,
    getConfig,
    shimOptions
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
        getConfig(shimOptions(process.env, config, Name.client, Target.web)),
        getConfig(shimOptions(process.env, config, Name.server, Target.node))
    ]);
}

export default getCompiler;
export { Compiler, Config };
