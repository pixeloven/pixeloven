import { removeEmpty } from "@pixeloven-core/common";
import { getUtils } from "@pixeloven-core/env";
import { resolveSourceRoot, resolveTsConfig } from "@pixeloven-core/filesystem";
import autoprefixer from "autoprefixer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { RuleSetRule } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Options } from "../types";

interface PluginBundleAnalyzerOptions {
    enabled: boolean;
    host: string;
    port: number;
    outputDir: string;
}

export function getSetup(options: Options) {
    const postCssPlugin = () => [
        require("postcss-flexbugs-fixes"),
        autoprefixer({
            flexbox: "no-2009",
        }),
    ];

    const {
        ifClient,
        ifDevelopment,
        ifProduction,
        ifNotLibrary,
        ifServer,
    } = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target,
    });

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
                emitFile: ifServer(false, true),
                name: ifProduction(
                    "static/media/[name].[contenthash].[ext]",
                    "static/media/[name].[hash].[ext]",
                ),
            },
        };
    }

    function getModuleSCSSLoader() {
        /**
         * @todo what to do here?????
         */
        return ifClient(
            {
                test: /\.(scss|sass|css)$/i,
                use: removeEmpty([
                    ifDevelopment({
                        loader: require.resolve("css-hot-loader"),
                    }),
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve("css-loader"),
                    },
                    {
                        loader: require.resolve("postcss-loader"),
                        options: {
                            ident: "postcss",
                            plugins: postCssPlugin,
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
                            onlyLocals: true,
                        },
                    },
                ],
            },
        );
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
                            require.resolve(
                                "@babel/plugin-syntax-dynamic-import",
                            ),
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
                    options: ifNotLibrary(
                        {
                            configFile: resolveTsConfig(),
                            transpileOnly: true,
                        },
                        {
                            configFile: resolveTsConfig(),
                        },
                    ),
                },
            ],
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

    function getPluginForkTsCheckerWebpack() {
        return ifNotLibrary(
            ifProduction(
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
            ),
        );
    }

    return {
        getModuleFileLoader,
        getModuleSCSSLoader,
        getModuleTypeScriptLoader,
        getPluginBundleAnalyzer,
        getPluginForkTsCheckerWebpack,
    };
}
