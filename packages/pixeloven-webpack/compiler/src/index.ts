import { mergeOptions } from "@pixeloven-core/common";
import { Mode, Name, Target } from "@pixeloven-core/env";
import { Config, getConfig } from "@pixeloven-webpack/config";
import { Configuration } from "webpack";
import Compiler from "./Compiler";

/**
 * Default compiler options
 */
const defaultCompilerOptions: Config = {
    entries: ["production:client:web"],
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
    const compilers: Configuration[] = [];

    config.entries.map((entry: string) => {
        const entryBlocks = entry.split(":");
        const mode = entryBlocks[0];
        const name = entryBlocks[1];
        const target = entryBlocks[2];
        compilers.push(
            getConfig({
                ...config,
                mode: Mode[mode],
                name: Name[name],
                target: Target[target],
            }),
        );
    });

    return Compiler.create(compilers);
}

export default getCompiler;
export { Compiler, Config };
