import {
    resolvePath,
    resolveSourceRoot,
    resolveTsConfig,
} from "@pixeloven-core/filesystem";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import {
    Options,
    Resolve,
    RuleSetQuery,
    RuleSetRule
} from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { getIfUtils } from "webpack-config-utils";
import { TargetName } from "../types";

export function getDevTool(withSourceMap: boolean) {
    return withSourceMap ? "eval-source-map" : false
}

export function getMode(environment: string) {
    const { ifProduction } = getIfUtils(environment);
    return ifProduction("production", "development");
}

/**
 * @todo Remove this as we use create-react-apps solution... eventually want to write our own
 * @param environment 
 */
export function getPerformance(environment: string): Options.Performance {
    const { ifDevelopment } = getIfUtils(environment);
    return {
        hints: ifDevelopment("warning", false),
    };
}

/**
 * All other files that aren't caught by the other loaders will go through this one.
 * @description "file" loader makes sure those assets get served by WebpackDevServer.
 * When you `import` an asset, you get its (virtual) filename.
 * In production, they would get copied to the `build` folder.
 * This loader doesn"t use a "test" so it will catch all modules
 * that fall through the other loaders.
 */
export function getModuleFileLoader(options: RuleSetQuery): RuleSetRule {
    return {
        exclude: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.html$/, /\.json$/],
        loader: require.resolve("file-loader"),
        options,
    };
}

/**
 * Define rule for transpiling TypeScript
 * @description Uncomment transpileOnly to Disable type checker - will use it in ForkTsCheckerWebpackPlugin at the cost of overlay.
 * Babel loader is present to support react-hot-loader.
 *
 * @todo Make configurable for CI and performance. Babel can also provide caching and polyfill
 * @todo Babel probably doesn't need to be run for server config
 */
export function getModuleTypeScriptLoader(): RuleSetRule {
    return {
        include: resolveSourceRoot(),
        test: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/],
        use: [
            {
                loader: require.resolve("babel-loader"),
                options: {
                    plugins: [
                        [
                            require.resolve(
                                "@babel/plugin-proposal-decorators",
                            ),
                            {
                                legacy: true,
                            },
                        ],
                        [
                            require.resolve(
                                "@babel/plugin-proposal-class-properties",
                            ),
                            {
                                loose: true,
                            },
                        ],
                        require.resolve("@babel/plugin-syntax-dynamic-import"),
                    ],
                    presets: [
                        [
                            require.resolve("@babel/preset-env"),
                            {
                                useBuiltIns: false,
                            },
                        ],
                        require.resolve("@babel/preset-react"),
                        require.resolve("@babel/preset-typescript"),
                    ],
                },
            },
            {
                loader: require.resolve("ts-loader"),
                options: {
                    configFile: resolveTsConfig(),
                    transpileOnly: true,
                },
            },
        ],
    };
};

interface PluginBundleAnalyzerOptions {
    enabled: boolean;
    env: string;
    host: string;
    port: number;
    name: TargetName;
    outputDir: string;
}

/**
 * Generate a stats file for webpack-bundle-analyzer
 * @todo Need to find our own logging solution
 *
 * @env all
 * @param options 
 */
export function getPluginBundleAnalyzer(options: PluginBundleAnalyzerOptions) {
    const { ifProduction } = getIfUtils(options.env);
    const statsFilename = path.resolve(`${options.outputDir}/${options.name}-stats.json`);
    const reportFilename = path.resolve(`${options.outputDir}/${options.name}-report.html`);
    return ifProduction(
        new BundleAnalyzerPlugin({
            analyzerMode: options.enabled ? "static" : "disabled",
            generateStatsFile: options.enabled,
            // logLevel: "silent",
            openAnalyzer: false,
            reportFilename,
            statsFilename,
        }),
        new BundleAnalyzerPlugin({
            analyzerHost: options.host,
            analyzerMode: options.enabled ? "server" : "disabled",
            analyzerPort: options.port,
            // logLevel: "silent",
            openAnalyzer: false,
        })
    )
}

/**
 * Perform type checking and linting in a separate process to speed up compilation
 * @env all
 */
export function getPluginForkTsCheckerWebpack(environment: string) {
    const { ifProduction } = getIfUtils(environment);
    return ifProduction(
        new ForkTsCheckerWebpackPlugin({
            silent: true,
            tsconfig: resolveTsConfig(),
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            silent: true,
            tsconfig: resolveTsConfig(),
            watch: resolveSourceRoot(),
        }),
    );
}

/**
 * @description Tell webpack how to resolve files and modules
 * Prevents users from importing files from outside of src/ (or node_modules/).
 * This often causes confusion because we only process files within src/ with babel.
 * To fix this, we prevent you from importing files out of src/ -- if you'd like to,
 * please link the files into your node_modules/ and let module-resolution kick in.
 * Make sure your source files are compiled, as they will not be processed in any way.
 *
 * @todo How to handle lerna???
 */
export function getResolve(): Resolve {
    return {
        alias: {
            "@src": resolveSourceRoot(),
        },
        extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx"],
        modules: [resolveSourceRoot(), "node_modules"],
        plugins: [
            new ModuleScopePlugin(resolveSourceRoot(), [
                resolvePath("package.json"),
            ]),
            new TsconfigPathsPlugin({
                configFile: resolveTsConfig(),
            }),
        ],
    };
};