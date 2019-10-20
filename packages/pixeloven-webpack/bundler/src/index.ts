import { mergeOptions } from "@pixeloven-core/common";
import { Compiler } from "@pixeloven-webpack/compiler";
import { Options } from "./types";

import Bundler from "./Bundler";

/**
 * Default bundler options
 */
const defaultBundlerOptions: Options = {
    clean: true,
    outputPath: "./dist",
};

/**
 * Create build from compiler and options
 * @param compiler
 * @param options
 */
function getBundler(compiler: Compiler, options: Partial<Options> = {}) {
    const mergedOptions = mergeOptions(defaultBundlerOptions, options);
    return Bundler(compiler, mergedOptions);
}

export default getBundler;
export { Bundler };
