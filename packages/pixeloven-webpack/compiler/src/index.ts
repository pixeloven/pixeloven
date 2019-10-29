import { mergeOptions } from "@pixeloven-core/common";
import { CompilerConfig, Config, getConfig } from "@pixeloven-webpack/config";
import { Configuration } from "webpack";
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
    const { compilers } = options;
    const config = mergeOptions(defaultCompilerOptions, options);
    const compilerConfigs: Configuration[] = [];

    if (compilers && compilers.length > 0) {
        compilers.map((compiler: CompilerConfig) => {
            const { entry, mode, name, target } = compiler;
            compilerConfigs.push(
                getConfig({
                    ...config,
                    entry,
                    mode,
                    name,
                    target,
                }),
            );
        });
    }

    return Compiler.create(compilerConfigs);
}

export default getCompiler;
export { Compiler, Config };
