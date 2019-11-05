import { removeEmpty } from "@pixeloven-core/common";
import { getUtils } from "@pixeloven-core/env";
import {
    resolvePath,
    resolveSourceRoot,
    resolveTsConfig,
} from "@pixeloven-core/filesystem";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TerserPlugin from "terser-webpack-plugin";
import TimeFixPlugin from "time-fix-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack, {
    Configuration,
    DevtoolModuleFilenameTemplateInfo,
} from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
import webpackNodeExternals from "webpack-node-externals";
import { Options } from "./types";

import { getSetup } from "./helpers/shared";

/**
 * @todo Source maps for libraries
 * @todo figure out how to do the chaining for the manifest and the hot reload
 *
 * @param options
 */
function getConfig(options: Options) {
    /**
     * Utility functions to help segment configuration based on environment
     */
    const {
        ifProduction,
        ifDevelopment,
        ifClient,
        ifNode,
        ifNotClient,
        ifServer,
    } = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target,
    });

    const {
        getModuleFileLoader,
        getModuleSCSSLoader,
        getModuleTypeScriptLoader,
        getPluginBundleAnalyzer,
        getPluginForkTsCheckerWebpack,
    } = getSetup(options);

    /**
     * Describe source pathing in dev tools
     * @param info
     */
    function devtoolModuleFilenameTemplate(
        info: DevtoolModuleFilenameTemplateInfo,
    ) {
        if (ifProduction()) {
            return path
                .relative(resolveSourceRoot(), info.absoluteResourcePath)
                .replace(/\\/g, "/");
        }
        return path.resolve(info.absoluteResourcePath).replace(/\\/g, "/");
    }

    return removeEmpty({
        bail: ifProduction(),
        devtool: options.sourceMap ? "eval-source-map" : false,
        entry: ifClient(
            {
                main: removeEmpty([
                    /**
                     * @todo This is deprecated. Need to link core-js directly
                     */
                    require.resolve("@babel/polyfill"),
                    ifDevelopment(
                        `webpack-hot-middleware/client?path=${path.normalize(
                            `/${options.publicPath}/__webpack_hmr`,
                        )}`,
                        undefined,
                    ),
                    resolvePath(options.entry),
                ]),
            },
            [resolvePath(options.entry)],
        ),
        externals: ifNotClient([
            // Exclude from local node_modules dir
            webpackNodeExternals(),
            // Exclude from file - helpful for lerna packages
            webpackNodeExternals({
                modulesFromFile: true,
            }),
        ]),
        mode: ifProduction("production", "development"),
        module: {
            rules: [
                {
                    oneOf: [
                        getModuleTypeScriptLoader(),
                        getModuleSCSSLoader(),
                        getModuleFileLoader(),
                    ],
                },
            ],
            strictExportPresence: true,
        },
        name: options.name,
        node: ifNode(
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
        ),
        // {
        //     /**
        //      * @todo NEED to make this better for server and library cases
        //      */
        //     minimize: false,
        //     noEmitOnErrors: true,
        // },
        optimization: {
            minimize: ifProduction(),
            minimizer: ifProduction(
                removeEmpty([
                    /**
                     * Minify the code JavaScript
                     */
                    new TerserPlugin(
                        ifClient(
                            {
                                extractComments: "all",
                                sourceMap: options.sourceMap,
                                terserOptions: {
                                    safari10: true,
                                },
                            },
                            {
                                extractComments: "all",
                                sourceMap: options.sourceMap,
                            },
                        ),
                    ),
                    /**
                     * Optimize CSS similar to hoe we might with JS
                     */
                    ifClient(new OptimizeCSSAssetsPlugin()),
                ]),
                [],
            ),
            noEmitOnErrors: true,
            /**
             * @todo See how we can stop vendors-main (no s)
             * @todo Make configurable v8 (include ability to provide these rules in json form)
             */
            splitChunks: ifClient({
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
            }),
        },
        output: ifClient(
            {
                chunkFilename: ifProduction(
                    "static/js/[name].[contenthash].js",
                    "static/js/[name].[hash].js",
                ),
                devtoolModuleFilenameTemplate,
                filename: ifProduction(
                    "static/js/[name].[contenthash].js",
                    "static/js/[name].[hash].js",
                ),
                path: resolvePath(
                    path.normalize(`${options.outputPath}/public`),
                    false,
                ), // @todo THis should not be hardcoded once we split client and server
                publicPath: options.publicPath,
            },
            ifServer(
                {
                    filename: "server.js",
                    libraryTarget: "commonjs2",
                    path: resolvePath(options.outputPath, false),
                    publicPath: options.publicPath,
                },
                {
                    filename: "lib/index.js",
                    library: "CHANGE_ME",
                    libraryTarget: "umd",
                    path: resolvePath(options.outputPath, false),
                },
            ),
        ),
        /**
         * @todo might not need this anymore since we have file reporting
         */
        performance: {
            hints: ifDevelopment("warning", false),
        },
        plugins: removeEmpty([
            /**
             * Fixes a known issue with cross-platform differences in file watchers,
             * so that webpack doesn't lose file changes when watched files change rapidly
             * https://github.com/webpack/webpack-dev-middleware#known-issues
             *
             * @env development
             */
            ifDevelopment(new TimeFixPlugin()),
            /**
             * Watcher doesn't work well if you mistype casing in a path so we use
             * a plugin that prints an error when you attempt to do this.
             * See https://github.com/facebookincubator/create-react-app/issues/240
             */
            ifDevelopment(new CaseSensitivePathsPlugin()),
            /**
             * Helps prevent hashes from updating if a bundle hasn't changed.
             */
            new webpack.HashedModuleIdsPlugin(),
            /**
             * Checks for circular dependencies
             */
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /node_modules/,
            }),
            /**
             * Moment.js is an extremely popular library that bundles large locale files
             * by default due to how Webpack interprets its code. This is a practical
             * solution that requires the user to opt into importing specific locales.
             * @url https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
             */
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            /**
             * Define environmental variables base on entry point
             * @description Provides entry point specific env variables
             */
            new webpack.EnvironmentPlugin({
                NAME: options.name,
                PUBLIC_PATH: options.publicPath,
                TARGET: options.target,
            }),
            /**
             * Forks ts type checker into another process
             */
            getPluginForkTsCheckerWebpack(),
            /**
             * Extract css to file
             */
            ifClient(
                new MiniCssExtractPlugin({
                    chunkFilename: ifProduction(
                        "static/css/[name].[contenthash].css",
                        "static/css/main.css",
                    ),
                    filename: ifProduction(
                        "static/css/[name].[contenthash].css",
                        "static/css/main.css",
                    ),
                }),
            ),
            /**
             * Bundle analyzer for js
             */
            getPluginBundleAnalyzer(options.stats),
            /**
             * Generate a manifest file which contains a mapping of all asset filenames
             * to their corresponding output file so that tools can pick it up without
             * having to parse `index.html`.
             *
             * @todo should only run for client
             */
            ifProduction(
                new ManifestPlugin({
                    fileName: "asset-manifest.json",
                }),
            ),
            /**
             * This is necessary to emit hot updates (currently CSS only):
             *
             * @todo should only run for client
             */
            ifDevelopment(new webpack.HotModuleReplacementPlugin()),
        ]),
        profile: options.profiling,
        /**
         * @description Tell webpack how to resolve files and modules
         * Prevents users from importing files from outside of src/ (or node_modules/).
         * This often causes confusion because we only process files within src/ with babel.
         * To fix this, we prevent you from importing files out of src/ -- if you'd like to,
         * please link the files into your node_modules/ and let module-resolution kick in.
         * Make sure your source files are compiled, as they will not be processed in any way.
         */
        resolve: {
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
        },
        stats: "verbose",
        target: options.target,
    }) as Configuration;
}

export { getConfig, Options };
