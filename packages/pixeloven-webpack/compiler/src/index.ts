import { mergeOptions } from "@pixeloven-core/common";
import { CompilerConfig, Config, getConfig } from "@pixeloven-webpack/config";
import { Configuration } from "webpack";
import Compiler from "./Compiler";

/**
 * Default compiler options
 */
const defaultCompilerOptions: Config = {
    compilers: undefined,
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

    if (config.compilers && config.compilers.length > 0) {
        config.compilers.map((compiler: CompilerConfig) => {
            const { mode, name, target } = compiler;
            compilers.push(
                getConfig({
                    ...config,
                    mode,
                    name,
                    target,
                }),
            );
        });
    }

    return Compiler.create(compilers);
}

export default getCompiler;
export { Compiler, Config };
