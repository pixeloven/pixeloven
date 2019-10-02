import { resolvePath } from "@pixeloven-core/macros";
import autoprefixer from "autoprefixer";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
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
    Module,
    Node,
    Options,
    Output,
    Plugin,
    Resolve,
    RuleSetRule,
} from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import { Config } from "../../types";

const config = (env: NodeJS.ProcessEnv, options: Config): Configuration => {
    /**
     * Set local options
     */
    const name = "client";
    const target = "web";
    const publicPath = options.path;
    const outputPath = options.outputPath;
    const publicOutputPath = path.normalize(`${outputPath}/public`);
    const recordsPath = path.resolve(`${outputPath}/${name}-stats.json`);

    /**
     * Setup for stats
     */
    const statsDir = options.withStatsDir;
    const statsFilename = path.resolve(`${statsDir}/${name}-stats.json`);
    const reportFilename = path.resolve(`${statsDir}/${name}-report.html`);

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
                .relative(resolvePath("src"), info.absoluteResourcePath)
                .replace(/\\/g, "/");
        }
        return path.resolve(info.absoluteResourcePath).replace(/\\/g, "/");
    };

    /**
     * Define entrypoint(s) for client
     */
    const hmrPath = path.normalize(`/${publicPath}/__webpack_hmr`);
    const entry = {
        main: removeEmpty([
            require.resolve("@babel/polyfill"),
            ifDevelopment(
                `webpack-hot-middleware/client?path=${hmrPath}`,
                undefined,
            ),
            resolvePath("src/client/index.tsx"),
        ]),
    };

    /**
     * Post CSS fixes
     */
    const postCssPlugin = () => [
        require("postcss-flexbugs-fixes"),
        autoprefixer({
            flexbox: "no-2009",
        }),
    ];

    /**
     * All other files that aren't caught by the other loaders will go through this one.
     * @description "file" loader makes sure those assets get served by WebpackDevServer.
     * When you `import` an asset, you get its (virtual) filename.
     * In production, they would get copied to the `build` folder.
     * This loader doesn"t use a "test" so it will catch all modules
     * that fall through the other loaders.
     */
    const catchAllRule = {
        exclude: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.html$/, /\.json$/],
        loader: require.resolve("file-loader"),
        options: {
            name: ifProduction(
                "static/media/[name].[contenthash].[ext]",
                "static/media/[name].[hash].[ext]",
            ),
        },
    };

    /**
     * Handle css/scss
     */
    const scssRule: RuleSetRule = {
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
            },
        ]),
    };

    /**
     * Define rule for transpiling TypeScript
     * @description Un-comment transpileOnly to Disable type checker - will use it in ForkTsCheckerWebpackPlugin at the cost of overlay.
     * Babel loader is present to support react-hot-loader.
     *
     * @todo Need to break some of this into packages for story book as well?
     */
    const typeScriptRule: RuleSetRule = {
        include: resolvePath("src"),
        test: /\.(ts|tsx)$/,
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
                    configFile: resolvePath("tsconfig.json"),
                    transpileOnly: true,
                },
            },
        ],
    };

    /**
     * Define how source files are handled
     */
    const module: Module = {
        rules: [
            {
                oneOf: [typeScriptRule, scssRule, catchAllRule],
            },
        ],
        strictExportPresence: true,
    };

    /**
     * @description Some libraries import Node modules but don"t use them in the browser.
     * Tell Webpack to provide empty mocks for them so importing them works.
     */
    const node: Node = {
        child_process: "empty",
        dgram: "empty",
        dns: "mock",
        fs: "empty",
        http2: "empty",
        module: "empty",
        net: "empty",
        tls: "empty",
    };

    /**
     * Define build optimization options
     */
    const optimization: Options.Optimization = {
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
    };

    /**
     * @description Output instructions for client build
     */
    const output: Output = removeEmpty({
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
    });

    /**
     * Define build performance options
     */
    const performance: Options.Performance = {
        hints: ifDevelopment("warning", false),
    };

    /**
     * @description Plugins for client specific builds
     */
    const plugins: Plugin[] = removeEmpty([
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
        ifProduction(
            new ForkTsCheckerWebpackPlugin({
                silent: true,
                tsconfig: resolvePath("tsconfig.json"),
            }),
            new ForkTsCheckerWebpackPlugin({
                async: false,
                silent: true,
                tsconfig: resolvePath("tsconfig.json"),
                watch: resolvePath("src"),
            }),
        ),
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
        /**
         * Generate a stats file for webpack-bundle-analyzer
         * @todo Need to find our own logging solution
         *
         * @env all
         */
        ifProduction(
            new BundleAnalyzerPlugin({
                analyzerMode: options.withStats ? "static" : "disabled",
                generateStatsFile: options.withStats,
                // logLevel: "silent",
                openAnalyzer: false,
                reportFilename,
                statsFilename,
            }),
            new BundleAnalyzerPlugin({
                analyzerHost: options.withStatsHost,
                analyzerMode: options.withStats ? "server" : "disabled",
                analyzerPort: options.withStatsPort,
                // logLevel: "silent",
                openAnalyzer: false,
            }),
        ),
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
        ifDevelopment(new webpack.NoEmitOnErrorsPlugin(), undefined),
    ]);

    /**
     * @description Tell webpack how to resolve files and modules
     * Prevents users from importing files from outside of src/ (or node_modules/).
     * This often causes confusion because we only process files within src/ with babel.
     * To fix this, we prevent you from importing files out of src/ -- if you'd like to,
     * please link the files into your node_modules/ and let module-resolution kick in.
     * Make sure your source files are compiled, as they will not be processed in any way.
     */
    const resolve: Resolve = {
        extensions: [
            ".mjs",
            ".web.ts",
            ".ts",
            ".web.tsx",
            ".tsx",
            ".web.js",
            ".js",
            ".json",
            ".web.jsx",
            ".jsx",
        ],
        modules: [resolvePath("src"), "node_modules"],
        plugins: [
            new ModuleScopePlugin(resolvePath("src"), [
                resolvePath("package.json"),
            ]),
            new TsconfigPathsPlugin({
                configFile: resolvePath("tsconfig.json"),
            }),
        ],
    };

    /**
     * Client side configuration
     */
    return {
        bail: ifProduction(),
        devtool: options.withSourceMap ? "eval-source-map" : false,
        entry,
        mode: ifProduction("production", "development"),
        module,
        name,
        node,
        optimization,
        output,
        performance,
        plugins,
        profile: options.withProfiling,
        recordsPath,
        resolve,
        stats: "verbose",
        target,
    };
};

export default config;
