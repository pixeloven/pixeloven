import { removeEmpty } from "@pixeloven-core/common";
import { getUtils } from "@pixeloven-core/env";
import {
    resolvePath,
    resolveSourceRoot,
    resolveTsConfig,
} from "@pixeloven-core/filesystem";
import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TerserPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import {
    DevtoolModuleFilenameTemplateInfo,
    Options as WebpackOptions,
    Resolve,
    RuleSetRule,
} from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpackNodeExternals from "webpack-node-externals";
import { Options } from "../types";

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

    const { ifClient, ifDevelopment, ifProduction, ifNode } = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target,
    });

    function getDevTool() {
        return options.sourceMap;
    }

    function getEntry() {
        return ifClient(
            {
                main: removeEmpty([
                    ifDevelopment(
                        `@pixeloven-webpack/hot-middleware/dist/lib/client?path=${path.normalize(
                            `/${options.publicPath}/__${options.namespace}_hmr`,
                        )}`,
                        undefined,
                    ),
                    resolvePath(options.entry),
                ]),
            },
            [resolvePath(options.entry)],
        );
    }

    function getExternals() {
        if (!options.allowExternals) {
            return ifNode([
                // Exclude from local node_modules dir
                webpackNodeExternals(),
                // Exclude from file - helpful for lerna packages
                webpackNodeExternals({
                    modulesFromFile: true,
                }),
            ]);
        }
        return false;
    }

    function getOptimization() {
        /**
         * @todo Make splitchunks more configurable.
         */
        return ifClient(
            {
                minimize: ifProduction(),
                minimizer: ifProduction(
                    [
                        /**
                         * Minify the code JavaScript
                         *
                         * @env production
                         */
                        new TerserPlugin({
                            cache: true,
                            extractComments: "all",
                            parallel: true,
                            sourceMap: !!options.sourceMap,
                            terserOptions: {
                                safari10: true,
                            },
                        }),
                        new OptimizeCSSAssetsPlugin(),
                    ],
                    [],
                ),
                noEmitOnErrors: true,
                runtimeChunk: {
                    /* tslint:disable no-any */
                    name: (entryPoint: any) => `${entryPoint.name}~runtime`,
                    /* tslint:enable no-any */
                },
                splitChunks: {
                    cacheGroups: {
                        coreJs: {
                            name: "vendor~core-js",
                            priority: 20,
                            test: /[\\/]node_modules[\\/](core-js)[\\/]/,
                        },
                        default: false,
                        lodash: {
                            name: "vendor~lodash",
                            priority: 20,
                            test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                        },
                        moment: {
                            name: "vendor~moment",
                            priority: 20,
                            test: /[\\/]node_modules[\\/](moment)[\\/]/,
                        },
                        react: {
                            name: "vendor~react",
                            priority: 20,
                            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        },
                        vendors: {
                            name: "vendor~main",
                            priority: 10,
                            test: /[\\/]node_modules[\\/]((?!(core-js|lodash|moment|react|react-dom)).*)[\\/]/,
                        },
                    },
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    maxSize: ifProduction(1000000, 0),
                    minSize: 0,
                },
            },
            {
                noEmitOnErrors: true,
            },
        );
    }

    function getOutput() {
        return ifClient(
            {
                chunkFilename: ifProduction(
                    `${options.staticAssetPath}/js/[name].[contenthash].js`,
                    `${options.staticAssetPath}/js/[name].[hash].js`,
                ),
                devtoolModuleFilenameTemplate,
                filename: ifProduction(
                    `${options.staticAssetPath}/js/[name].[contenthash].js`,
                    `${options.staticAssetPath}/js/[name].[hash].js`,
                ),
                hotUpdateChunkFilename: `${options.staticAssetPath}/[id].[hash].hot-update.js`,
                hotUpdateMainFilename: `${options.staticAssetPath}/[hash].hot-update.json`,
                path: resolvePath(
                    path.normalize(`${options.outputPath}/public`),
                    false,
                ), // @todo THis should not be hardcoded once we split client and server
                publicPath: options.publicPath,
            },
            {
                filename: "server.js",
                libraryTarget: "commonjs2",
                path: resolvePath(options.outputPath, false),
                publicPath: options.publicPath,
            },
        );
    }

    function getMode() {
        return ifProduction("production", "development");
    }

    /**
     * All other files that aren't caught by the other loaders will go through this one.
     * @description "file" loader makes sure those assets get served by WebpackDevServer.
     * When you `import` an asset, you get its (virtual) filename.
     * In production, they would get copied to the `build` folder.
     * This loader doesn't use a "test" so it will catch all modules
     * that fall through the other loaders.
     */
    function getModuleFileLoader(): RuleSetRule {
        return {
            exclude: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve("file-loader"),
            options: {
                emitFile: ifClient(),
                name: ifProduction(
                    `${options.staticAssetPath}/media/[name].[contenthash].[ext]`,
                    `${options.staticAssetPath}/media/[name].[hash].[ext]`,
                ),
            },
        };
    }

    function getModuleSCSSLoader() {
        return ifClient(
            {
                test: /\.(scss|sass|css)$/i,
                use: removeEmpty([
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },

                    {
                        loader: require.resolve("css-loader"),
                    },
                    {
                        loader: require.resolve("postcss-loader"),
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("postcss-flexbugs-fixes"),
                                    autoprefixer({
                                        flexbox: "no-2009",
                                    }),
                                ],
                            },
                        },
                    },
                    {
                        loader: require.resolve("sass-loader"),
                        options: {
                            // Prefer `dart-sass`
                            implementation: require("sass"),
                        },
                    },
                ]),
            },
            {
                test: /\.(scss|sass|css)$/i,
                use: [
                    {
                        loader: require.resolve("css-loader"),
                        options: {
                            modules: {
                                exportOnlyLocals: true,
                            },
                        },
                    },
                    {
                        loader: require.resolve("sass-loader"),
                        options: {
                            // Prefer `dart-sass`
                            implementation: require("sass"),
                        },
                    },
                ],
            },
        );
    }

    /**
     * @todo Might not need this anymore
     */
    function getPerformance(): WebpackOptions.Performance {
        return {
            hints: ifDevelopment("warning", false),
        };
    }

    function getPluginBundleAnalyzer(analyzer: PluginBundleAnalyzerOptions) {
        const statsFilename = path.resolve(
            `${analyzer.outputDir}/${options.name}-stats.json`,
        );
        const reportFilename = path.resolve(
            `${analyzer.outputDir}/${options.name}-report.html`,
        );
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
            }),
        );
    }

    function getNode() {
        return ifNode(
            {
                __dirname: false,
                __filename: false,
            },
            {
                child_process: "empty",
                dgram: "empty",
                dns: "mock",
                fs: "empty",
                http2: "empty",
                module: "empty",
                net: "empty",
                tls: "empty",
            },
        );
    }

    /**
     * @description Tell webpack how to resolve files and modules
     * Prevents users from importing files from outside of src/ (or node_modules/).
     * This often causes confusion because we only process files within src/ with babel.
     * To fix this, we prevent you from importing files out of src/ -- if you'd like to,
     * please link the files into your node_modules/ and let module-resolution kick in.
     * Make sure your source files are compiled, as they will not be processed in any way.
     */
    function getResolve(): Resolve {
        return {
            alias: {
                "@src": resolveSourceRoot(),
            },
            extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx"],
            modules: [resolveSourceRoot(), "node_modules", "stories"],
            plugins: [
                new ModuleScopePlugin(resolveSourceRoot(), [
                    resolvePath("package.json"),
                ]),
                new TsconfigPathsPlugin({
                    configFile: resolveTsConfig(),
                }),
            ],
        };
    }

    return {
        getDevTool,
        getEntry,
        getExternals,
        getMode,
        getModuleFileLoader,
        getModuleSCSSLoader,
        getNode,
        getOptimization,
        getOutput,
        getPerformance,
        getPluginBundleAnalyzer,
        getResolve,
    };
}
