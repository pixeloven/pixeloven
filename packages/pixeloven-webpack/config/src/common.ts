import {
    resolvePath,
    resolveSourceRoot
} from "@pixeloven-core/filesystem";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import TimeFixPlugin from "time-fix-plugin";
import webpack, {
    Configuration,
    DevtoolModuleFilenameTemplateInfo
} from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
import {
    Name,
    Options,
    Target,
} from "./types"

import {
    getSetup,
    getUtils,
    removeEmpty
} from "./helpers/shared";

/**
 * @todo Create util generator similar to the webpack ones for splitting by name, target etc
 * @todo Merge these into one
 */

export function clientConfig(options: Options): Configuration {
    /**
     * Utility functions to help segment configuration based on environment
     */
    const { ifProduction, ifDevelopment } = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target
    });

    const {
        getDevTool,
        getEntry,
        getMode,
        getModuleFileLoader,
        getModuleSCSSLoader,
        getModuleTypeScriptLoader,
        getNode,
        getPerformance,
        getPluginBundleAnalyzer,
        getPluginForkTsCheckerWebpack,
        getResolve
    } = getSetup(options);

    /**
     * Set local options
     */
    const name = Name.client;
    const target = Target.web;
    const publicPath = options.publicPath;
    const outputPath = options.outputPath;
    const publicOutputPath = path.normalize(`${outputPath}/public`);
    const recordsPath = path.resolve(`${outputPath}/${name}-stats.json`);

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

    /**
     * Client side configuration
     */
    return {
        bail: ifProduction(),
        devtool: getDevTool(),
        entry: getEntry(),
        mode: getMode(),
        module: {
            rules: [{
                oneOf: [
                    getModuleTypeScriptLoader(), 
                    getModuleSCSSLoader(), 
                    getModuleFileLoader({
                        name: ifProduction(
                            "static/media/[name].[contenthash].[ext]",
                            "static/media/[name].[hash].[ext]",
                        ),
                    })
                ],
            }],
            strictExportPresence: true,
        },
        name,
        node: getNode(),
        optimization: {
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
                ],
                [],
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
        },
        output: removeEmpty({
            chunkFilename: ifProduction(
                "static/js/[name].[contenthash].js",
                "static/js/[name].[hash].js",
            ),
            devtoolModuleFilenameTemplate,
            filename: ifProduction(
                "static/js/[name].[contenthash].js",
                "static/js/[name].[hash].js",
            ),
            path: resolvePath(publicOutputPath, false),
            publicPath,
        }),
        performance: getPerformance(),
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
             * Watcher doesn"t work well if you mistype casing in a path so we use
             * a plugin that prints an error when you attempt to do this.
             * See https://github.com/facebookincubator/create-react-app/issues/240
             *
             * @env development
             */
            ifDevelopment(new CaseSensitivePathsPlugin()),
            /**
             * Helps prevent hashes from updating if a bundle hasn't changed.
             * @env all
             */
            new webpack.HashedModuleIdsPlugin(),
            /**
             * Moment.js is an extremely popular library that bundles large locale files
             * by default due to how Webpack interprets its code. This is a practical
             * solution that requires the user to opt into importing specific locales.
             * @url https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
             * @env all
             */
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            /**
             * Does a string replacement for specific env variables
             * @description Provides entry point specific env variables
             * @todo Unify PUBLIC_URL: publicPath with same name
             * @env all
             */
            new webpack.EnvironmentPlugin({
                NAME: name,
                PUBLIC_PATH: publicPath,
                TARGET: target,
            }),
            /**
             * Perform type checking and linting in a separate process to speed up compilation
             * @env all
             */
            getPluginForkTsCheckerWebpack(),
            /**
             * Extract css to file
             * @env production
             */
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
            getPluginBundleAnalyzer(options.stats),
            /**
             * Generate a manifest file which contains a mapping of all asset filenames
             * to their corresponding output file so that tools can pick it up without
             * having to parse `index.html`.
             *
             * @env production
             */
            ifProduction(
                new ManifestPlugin({
                    fileName: "asset-manifest.json",
                })
            ),
            /**
             * This is necessary to emit hot updates (currently CSS only):
             *
             * @env development
             */
            ifDevelopment(new webpack.HotModuleReplacementPlugin()),
        ]),
        profile: options.profiling,
        recordsPath,
        resolve: getResolve(),
        stats: "verbose",
        target,
    };
};

export function serverConfig(options: Options): Configuration {
    /**
     * Utility functions to help segment configuration based on environment
     */
    const { ifProduction, ifDevelopment } = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target
    });

    const {
        getDevTool,
        getEntry,
        getExternals,
        getMode,
        getModuleFileLoader,
        getModuleSCSSLoader,
        getModuleTypeScriptLoader,
        getNode,
        getPerformance,
        getPluginBundleAnalyzer,
        getPluginForkTsCheckerWebpack,
        getResolve
    } = getSetup(options);

    /**
     * Server side configuration
     */
    return {
        bail: ifProduction(),
        devtool: getDevTool(),
        entry: getEntry(),
        externals: getExternals(),
        mode: getMode(),
        module: {
            rules: [{
                oneOf: [
                    getModuleTypeScriptLoader(), 
                    getModuleSCSSLoader(), 
                    getModuleFileLoader({
                        emitFile: false,
                        name: ifProduction(
                            "static/media/[name].[contenthash].[ext]",
                            "static/media/[name].[hash].[ext]",
                        ),
                    })
                ]
            }],
            strictExportPresence: true,
        },
        name: options.name,
        node: getNode(),
        optimization: {
            noEmitOnErrors: true
        },
        output: {
            filename: "server.js",
            libraryTarget: "commonjs2",
            path: resolvePath(options.outputPath, false),
            publicPath: options.publicPath,
        },
        performance: getPerformance(),
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
             * Watcher doesn"t work well if you mistype casing in a path so we use
             * a plugin that prints an error when you attempt to do this.
             * See https://github.com/facebookincubator/create-react-app/issues/240
             *
             * @env development
             */
            ifDevelopment(new CaseSensitivePathsPlugin()),
            /**
             * Moment.js is an extremely popular library that bundles large locale files
             * by default due to how Webpack interprets its code. This is a practical
             * solution that requires the user to opt into importing specific locales.
             * @url https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
             * @env all
             */
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            /**
             * Define environmental variables base on entry point
             * @description Provides entry point specific env variables
             *
             * @env all
             */
            new webpack.EnvironmentPlugin({
                NAME: options.name,
                PUBLIC_PATH: options.publicPath,
                TARGET: options.target,
            }),
            getPluginBundleAnalyzer(options.stats),
            getPluginForkTsCheckerWebpack(),
        ]),
        profile: options.profiling,
        recordsPath: path.resolve(`${options.outputPath}/${options.name}-profile.json`),
        resolve: getResolve(),
        stats: "verbose",
        target: options.target,
    };
};

