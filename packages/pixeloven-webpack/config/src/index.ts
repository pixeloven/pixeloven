import { removeEmpty } from "@pixeloven-core/common";
import { getUtils } from "@pixeloven-core/env";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TimeFixPlugin from "time-fix-plugin";
import webpack, { Configuration } from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
import { CompilerConfig, Config, Options } from "./types";

import { getSetup } from "./helpers/shared";

function getConfig(options: Options) {
    /**
     * Utility functions to help segment configuration based on environment
     */
    const { ifProduction, ifDevelopment, ifClient } = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target,
    });

    const {
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
        getResolve,
    } = getSetup(options);

    const plugins = ifClient(
        removeEmpty([
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
             * @env all
             */
            new webpack.EnvironmentPlugin({
                NAME: options.name,
                PUBLIC_PATH: options.publicPath,
                TARGET: options.target,
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
                }),
            ),
            /**
             * This is necessary to emit hot updates (currently CSS only):
             *
             * @env development
             */
            ifDevelopment(new webpack.HotModuleReplacementPlugin()),
        ]),
        removeEmpty([
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
    );

    /**
     * Client side configuration
     */
    return removeEmpty({
        bail: ifProduction(),
        devtool: options.sourceMap ? "eval-source-map" : false,
        entry: getEntry(),
        externals: getExternals(),
        mode: getMode(),
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
        node: getNode(),
        optimization: getOptimization(),
        output: getOutput(),
        performance: getPerformance(),
        plugins,
        profile: options.profiling,
        resolve: getResolve(),
        stats: "verbose",
        target: options.target,
    }) as Configuration;
}

export { Config, CompilerConfig, getConfig };
