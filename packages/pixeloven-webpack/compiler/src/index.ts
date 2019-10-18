import { mergeOptions } from "@pixeloven-core/common";
import { Mode, Name, Target } from "@pixeloven-core/env";
import { Config, getConfig } from "@pixeloven-webpack/config";
import Compiler from "./Compiler";

/**
 * Default compiler options
 */
const defaultCompilerOptions: Config = {
    outputPath: "./dist",
    profiling: false,
    publicPath: "/",
    sourceMap: false,
    stats: {
        enabled: false,
        host: "localhost",
        outputDir: "./stats",
        port: 8081,
    },
};

/**
 * Returns a compiler with our custom configuration
 * @param options
 */
function getCompiler(options: Partial<Config> = {}) {
    const config = mergeOptions(defaultCompilerOptions, options);
    const nodeEnv = process.env.NODE_ENV || "production";

    return Compiler.create([
        getConfig({
            mode: Mode.hasOwnProperty(nodeEnv)
                ? Mode[nodeEnv]
                : Mode.production,
            name: Name.client,
            target: Target.web,
            ...config,
        }),
        getConfig({
            mode: Mode.hasOwnProperty(nodeEnv)
                ? Mode[nodeEnv]
                : Mode.production,
            name: Name.server,
            target: Target.node,
            ...config,
        }),
    ]);
}

export default getCompiler;
export { Compiler, Config };
