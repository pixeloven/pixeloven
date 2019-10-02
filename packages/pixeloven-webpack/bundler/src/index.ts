import { mergeOptions } from "@pixeloven-core/common";
import { Compiler } from "@pixeloven-webpack/compiler";

/**
 * @todo Rename build to bundler
 */
import Build, { Config } from "./Build";

/**
 * Default compiler options
 */
const defaultBuildOptions: Config = {
    outputPath: "./dist",
};

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
function getBundler(
    compiler: Compiler,
    options: Partial<Config> = {},
) {
    const config = mergeOptions(defaultBuildOptions, options);
    return new Build(compiler, config);
}

export default getBundler;
export {
    Build,
    Config
}