import { mergeOptions } from "@pixeloven-core/common";
import { Mode, Name, Target } from "@pixeloven-core/env";
import { getConfig, Options } from "@pixeloven-webpack/config";
import Compiler from "./Compiler";

/**
 * Default compiler options
 */
const defaultCompilerOptions: Options = {
    allowExternals: false,
    entry: "./src/index.ts",
    mode: Mode.development,
    name: Name.library,
    namespace: "webpack",
    outputPath: "./dist",
    profiling: false,
    publicPath: "/",
    sourceMap: "eval-source-map",
    staticAssetPath: "static",
    stats: {
        enabled: false,
        host: "localhost",
        outputDir: "./stats",
        port: 8081,
    },
    target: Target.node,
};

/**
 * Returns a compiler with our custom configuration
 * @todo Move get config into CLI instead of here.
 * @param options
 */
function getCompiler(options: Array<Partial<Options>> = []) {
    const combined = options.map((single) => {
        return getConfig(mergeOptions(defaultCompilerOptions, single));
    });
    return Compiler.create(combined);
}

export default getCompiler;
export { Compiler, Options };
