import {
    resolvePath,
    resolveSourceRoot,
} from "@pixeloven-core/filesystem";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import TimeFixPlugin from "time-fix-plugin";
import webpack, {
    Configuration,
    DevtoolModuleFilenameTemplateInfo,
} from "webpack";
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import {
    Config,
    Target, 
    TargetName
} from "./types"

import {
    getDevTool,
    getMode,
    getModuleFileLoader,
    getModuleTypeScriptLoader,
    getPerformance,
    getPluginBundleAnalyzer,
    getPluginForkTsCheckerWebpack,
    getResolve
} from "./helpers/shared";

import {
    getModuleSCSSLoader,
    getNode
} from "./helpers/client";


function config(env: NodeJS.ProcessEnv, options: Config): Configuration {
    /**
     * Set local options
     */
    const name = TargetName.client;
    const target = Target.web;
    const publicPath = options.path;
    const outputPath = options.outputPath;
    const publicOutputPath = path.normalize(`${outputPath}/public`);
    const recordsPath = path.resolve(`${outputPath}/${name}-stats.json`);

    /**
     * Set env variables
     */
    const environment = env.NODE_ENV || "production";

    /**
     * Utility functions to help segment configuration based on environment
     */
    const { ifProduction, ifDevelopment } = getIfUtils(environment);

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
     * Define entrypoint(s) for client
     */
    const hmrPath = path.normalize(`/${publicPath}/__webpack_hmr`);

    /**
     * Client side configuration
     */
    return {
        bail: ifProduction(),
        devtool: getDevTool(options.withSourceMap),
        entry: {
            main: removeEmpty([
                require.resolve("@babel/polyfill"),
                ifDevelopment(
                    `webpack-hot-middleware/client?path=${hmrPath}`,
                    undefined,
                ),
                resolvePath("src/client/index.tsx"),
            ]),
        },
        mode: getMode(environment),
        module: {
            rules: [{
                oneOf: [
                    getModuleTypeScriptLoader(), 
                    getModuleSCSSLoader(environment), 
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
                        sourceMap: options.withSourceMap,
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
        performance: getPerformance(environment),
        plugins: removeEmpty([
            /**
             * Fixes a known issue with cross-platform differences in file watchers,
             * so that webpack doesn't lose file changes when watched files change rapidly
             * https://github.com/webpack/webpack-dev-middleware#known-issues
             *
             * @env development
             */
            ifDevelopment(new TimeFixPlugin(), undefined),
            /**
             * Watcher doesn"t work well if you mistype casing in a path so we use
             * a plugin that prints an error when you attempt to do this.
             * See https://github.com/facebookincubator/create-react-app/issues/240
             *
             * @env development
             */
            ifDevelopment(new CaseSensitivePathsPlugin(), undefined),
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
            getPluginForkTsCheckerWebpack(environment),
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
            getPluginBundleAnalyzer({
                enabled: options.withStats,
                env: environment,
                host: options.withStatsHost,
                name,
                outputDir: options.withStatsDir,
                port: options.withStatsPort,
            }),
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
                undefined,
            ),
            /**
             * This is necessary to emit hot updates (currently CSS only):
             *
             * @env development
             */
            ifDevelopment(new webpack.HotModuleReplacementPlugin(), undefined),
        ]),
        profile: options.withProfiling,
        recordsPath,
        resolve: getResolve(),
        stats: "verbose",
        target,
    };
};

export default config;
