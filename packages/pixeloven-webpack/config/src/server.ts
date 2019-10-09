import {
    resolvePath,
} from "@pixeloven-core/filesystem";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import path from "path";
import TimeFixPlugin from "time-fix-plugin";
import webpack, {
    Configuration,
} from "webpack";
import { getIfUtils, removeEmpty } from "webpack-config-utils";

import {
    Config,
    Name,
    Target
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
    getEntry,
    getExternals,
    getModuleSCSSLoader,
    getNode
} from "./helpers/server";

function config(env: NodeJS.ProcessEnv, options: Config): Configuration {
    /**
     * Set local options
     */
    const name = Name.server;
    const target = Target.node;
    const publicPath = options.path;
    const buildPath = options.outputPath;
    const recordsPath = path.resolve(`${buildPath}/${name}-profile.json`);

    /**
     * Set env variables
     */
    const environment = env.NODE_ENV || "production";

    /**
     * Utility functions to help segment configuration based on environment
     */
    const { ifProduction, ifDevelopment } = getIfUtils(environment);

    /**
     * Server side configuration
     */
    return {
        bail: ifProduction(),
        devtool: getDevTool(options.withSourceMap),
        entry: getEntry(),
        externals: getExternals(),
        mode: getMode(environment),
        module: {
            rules: [{
                oneOf: [
                    getModuleTypeScriptLoader(), 
                    getModuleSCSSLoader(environment), 
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
        name,
        node: getNode(),
        optimization: {
            noEmitOnErrors: true
        },
        output: {
            filename: "server.js",
            libraryTarget: "commonjs2",
            path: resolvePath(buildPath, false),
            publicPath,
        },
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
                NAME: name,
                PUBLIC_PATH: publicPath,
                TARGET: target,
            }),
            getPluginBundleAnalyzer({
                enabled: options.withStats,
                env: environment,
                host: options.withStatsHost,
                name,
                outputDir: options.withStatsDir,
                port: options.withStatsPort + 1,
            }),
            getPluginForkTsCheckerWebpack(environment),
        ]),
        profile: options.withProfiling,
        recordsPath,
        resolve: getResolve(),
        stats: "verbose",
        target,
    };
};

export default config;
