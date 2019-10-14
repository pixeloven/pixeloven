import {getUtils} from "@pixeloven-core/env";
import {
    resolvePath,
    resolveSourceRoot,
    resolveTsConfig,
} from "@pixeloven-core/filesystem";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TerserPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import {
    DevtoolModuleFilenameTemplateInfo,
    Options as WebpackOptions,
    Resolve,
    RuleSetRule
} from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpackNodeExternals from "webpack-node-externals";
import { Options} from "../types";

import {
    getEntry as getClientEntry,
    getModuleSCSSLoader as getClientModuleSCSSLoader,
    getNode as getClientNode
} from "./client";

import {
    getEntry as getServerEntry,
    getModuleSCSSLoader as getServerModuleSCSSLoader,
    getNode as getServerNode
} from "./server";

interface PluginBundleAnalyzerOptions {
    enabled: boolean;
    host: string;
    port: number;
    outputDir: string;
}

export function getSetup(options: Options) {

    /**
     * Describe source pathing in dev tools
     * @param info
     */
    const devtoolModuleFilenameTemplate = (
        info: DevtoolModuleFilenameTemplateInfo,
    ) => {
        if (ifProduction()) {
            return path
                .relative(resolveSourceRoot(), info.absoluteResourcePath)
                .replace(/\\/g, "/");
        }
        return path.resolve(info.absoluteResourcePath).replace(/\\/g, "/");
    };


    const {ifClient, ifDevelopment, ifProduction, ifServer} = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target
    });

    function getDevTool() {
        return options.sourceMap ? "eval-source-map" : false
    }
    
    function getEntry() {
        return ifClient(getClientEntry(options.mode, options.publicPath), getServerEntry());
    }

    function getExternals() {
        return ifServer([
            // Exclude from local node_modules dir
            webpackNodeExternals(),
            // Exclude from file - helpful for lerna packages
            webpackNodeExternals({
                modulesFromFile: true,
            }),
        ], undefined);
    }

    function getOptimization() {
        return ifClient({
            minimize: ifProduction(),
            minimizer: ifProduction(
                [
                    /**
                     * Minify the code JavaScript
                     *
                     * @env production
                     */
                    new TerserPlugin({
                        extractComments: "all",
                        sourceMap: options.sourceMap,
                        terserOptions: {
                            safari10: true,
                        },
                    }),
                    new OptimizeCSSAssetsPlugin(),
                ],[]
            ),
            noEmitOnErrors: true,
            /**
             * @todo See how we can stop vendors-main (no s)
             * @todo Make configurable v8 (include ability to provide these rules in json form)
             */
            splitChunks: {
                cacheGroups: {
                    coreJs: {
                        name: "vendor~core-js",
                        test: /[\\/]node_modules[\\/](core-js)[\\/]/,
                    },
                    lodash: {
                        name: "vendor~lodash",
                        test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                    },
                    moment: {
                        name: "vendor~moment",
                        test: /[\\/]node_modules[\\/](moment)[\\/]/,
                    },
                    react: {
                        name: "vendor~react",
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    },
                    vendor: {
                        name: "vendor~main",
                        /**
                         * @todo https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
                         */
                        // name(mod) {
                        //     // get the name. E.g. node_modules/packageName/not/this/part.js
                        //     // or node_modules/packageName
                        //     const packageName = mod.context.match(
                        //         /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                        //     )[1];
                        //     // npm package names are URL-safe, but some servers don't like @ symbols
                        //     return `vendor~${packageName.replace("@", "")}`;
                        // },
                        test: /[\\/]node_modules[\\/](!core-js)(!lodash)(!moment)(!react)(!react-dom)[\\/]/,
                    },
                },
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 0,
            },
        }, {
            noEmitOnErrors: true
        });
    }

    function getOutput() {
        return ifClient({
            chunkFilename: ifProduction(
                "static/js/[name].[contenthash].js",
                "static/js/[name].[hash].js",
            ),
            devtoolModuleFilenameTemplate,
            filename: ifProduction(
                "static/js/[name].[contenthash].js",
                "static/js/[name].[hash].js",
            ),
            path: resolvePath(path.normalize(`${options.outputPath}/public`), false), // @todo THis should not be hardcoded once we split client and server
            publicPath: options.publicPath,
        }, {
            filename: "server.js",
            libraryTarget: "commonjs2",
            path: resolvePath(options.outputPath, false),
            publicPath: options.publicPath,
        })
    }

    function getMode() {
        return ifProduction("production", "development");
    }

    /**
     * All other files that aren't caught by the other loaders will go through this one.
     * @description "file" loader makes sure those assets get served by WebpackDevServer.
     * When you `import` an asset, you get its (virtual) filename.
     * In production, they would get copied to the `build` folder.
     * This loader doesn"t use a "test" so it will catch all modules
     * that fall through the other loaders.
     */
    function getModuleFileLoader(): RuleSetRule {
        return {
            exclude: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve("file-loader"),
            options: ifServer({
                emitFile: false,
            }, {
                name: ifProduction(
                    "static/media/[name].[contenthash].[ext]",
                    "static/media/[name].[hash].[ext]",
                ),
            }),
        };
    }

    function getModuleSCSSLoader() {
        return ifClient(getClientModuleSCSSLoader(options.mode), getServerModuleSCSSLoader(options.mode));
    }

    /**
     * Define rule for transpiling TypeScript
     * @description Uncomment transpileOnly to Disable type checker - will use it in ForkTsCheckerWebpackPlugin at the cost of overlay.
     * Babel loader is present to support react-hot-loader.
     *
     * @todo Make configurable for CI and performance. Babel can also provide caching and polyfill
     * @todo Babel probably doesn't need to be run for server config
     */
    function getModuleTypeScriptLoader(): RuleSetRule {
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

    /**
     * @todo Might not need this anymore
     */
    function getPerformance(): WebpackOptions.Performance {
        return {
            hints: ifDevelopment("warning", false),
        };
    }

    function getPluginBundleAnalyzer(analyzer: PluginBundleAnalyzerOptions) {
        const statsFilename = path.resolve(`${analyzer.outputDir}/${options.name}-stats.json`);
        const reportFilename = path.resolve(`${analyzer.outputDir}/${options.name}-report.html`);
        return ifProduction(
            new BundleAnalyzerPlugin({
                analyzerMode: analyzer.enabled ? "static" : "disabled",
                generateStatsFile: analyzer.enabled,
                // logLevel: "silent",
                openAnalyzer: false,
                reportFilename,
                statsFilename,
            }),
            new BundleAnalyzerPlugin({
                analyzerHost: analyzer.host,
                analyzerMode: analyzer.enabled ? "server" : "disabled",
                analyzerPort: ifClient(analyzer.port, analyzer.port + 1),
                // logLevel: "silent",
                openAnalyzer: false,
            })
        )
    }

    function getPluginForkTsCheckerWebpack() {
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

    function getNode(){
        return ifClient(getClientNode(), getServerNode());
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
    function getResolve(): Resolve {
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

    return {
        getDevTool,
        getEntry,
        getExternals,
        getMode,
        getModuleFileLoader,
        getModuleSCSSLoader,
        getModuleTypeScriptLoader,
        getNode,
        getOptimization,
        getOutput,
        getPerformance,
        getPluginBundleAnalyzer,
        getPluginForkTsCheckerWebpack,
        getResolve
    }
}
