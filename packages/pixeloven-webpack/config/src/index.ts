import { removeEmpty } from "@pixeloven-core/common";
import { getUtils } from "@pixeloven-core/env";
import { resolvePath, resolveSourceRoot } from "@pixeloven-core/filesystem";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import TimeFixPlugin from "time-fix-plugin";
import webpack, {
    Configuration,
    DevtoolModuleFilenameTemplateInfo,
} from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
import webpackNodeExternals from "webpack-node-externals";
import { CompilerConfig, Config, Options } from "./types";

import { getSetup } from "./helpers/shared";

function getConfig(options: Options) {
    /**
     * Utility functions to help segment configuration based on environment
     */
    const {
        ifProduction,
        ifDevelopment,
        ifClient,
        ifNotClient,
        ifNode,
        ifWeb,
        ifServer,
    } = getUtils({
        mode: options.mode,
        name: options.name,
        target: options.target,
    });

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

    const {
        getEntry,
        getModuleFileLoader,
        getModuleSCSSLoader,
        getModuleTypeScriptLoader,
        getOptimization,
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
        externals: ifNotClient(
            [
                // Exclude from local node_modules dir
                webpackNodeExternals(),
                // Exclude from file - helpful for lerna packages
                webpackNodeExternals({
                    modulesFromFile: true,
                }),
            ],
            undefined,
        ),
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
        node: ifWeb(
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
            {
                __dirname: false,
                __filename: false,
            },
        ),
        optimization: getOptimization(),
        // https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/
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
                // @todo This should just be the provided path and not hard-coded... the issue is we only accept a single --path
                path: resolvePath(
                    path.normalize(`${options.outputPath}/public`),
                    false,
                ),
                publicPath: options.publicPath,
            },
            {
                filename: ifServer("server.js", "lib/index.js"),
                libraryTarget: ifNode("commonjs2", "umd"),
                path: resolvePath(options.outputPath, false),
                publicPath: options.publicPath,
            },
        ),
        performance: {
            hints: ifDevelopment("warning", false),
        },
        plugins,
        profile: options.profiling,
        resolve: getResolve(),
        stats: "verbose",
        target: options.target,
    }) as Configuration;
}

export { Config, CompilerConfig, getConfig };
