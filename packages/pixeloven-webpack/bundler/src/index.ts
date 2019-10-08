import { mergeOptions } from "@pixeloven-core/common";
import { Compiler } from "@pixeloven-webpack/compiler";

/**
 * @todo Rename build to bundler
 */
import Bundler, { Config } from "./Bundler";

/**
 * Default compiler options
 */
const defaultBundlerOptions: Config = {
    outputPath: "./dist",
};

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
function getBundler(compiler: Compiler, options: Partial<Config> = {}) {
    const config = mergeOptions(defaultBundlerOptions, options);
    return new Bundler(compiler, config);
}

export default getBundler;
export { Bundler, Config };
