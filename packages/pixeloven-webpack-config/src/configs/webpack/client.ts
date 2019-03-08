import { resolvePath } from "@pixeloven/core";
import autoprefixer from "autoprefixer";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
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
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import { Config } from "../../types";

const config = (env: NodeJS.ProcessEnv, options: Config): Configuration => {
    /**
     * @todo optimize builds
     * see if we can use TS Fork (at least for prod build)
     * see how we can use babels cache
     * @todo implement tslint-loader if we can do ts fork in development
     */
    /**
     * Tell webpack what we are making :)
     */
    const name = "client";
    const target = "web";

    /**
     * Webpack uses `publicPath` to determine where the app is being served from.
     * It requires a trailing slash, or the file assets will get an incorrect path.
     *
     * @todo DEV needs to be / to serve assets :( but this breaks the bundle.js (server side is fine)
     * @todo Maybe do this in Output instead of here because some stuff might still need this.
     */
    const environment = env.NODE_ENV || "production";
    const publicPath = env.PUBLIC_URL || "/";
    const buildPath = env.BUILD_PATH || "dist";

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
    const entry = {
        main: removeEmpty([
            require.resolve("@babel/polyfill"),
            ifDevelopment(
                `webpack-hot-middleware/client?reload=true&path=__webpack_hmr`,
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
            browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
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
                "[name].[contenthash].[ext]",
                "[name].[hash].[ext]",
            ),
            outputPath: "static/media/",
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
     * Define rule for static assets
     * @description "url" loader works like "file" loader except that it embeds assets
     * smaller than specified limit in bytes as data URLs to avoid requests.
     */
    const staticFileRule: RuleSetRule = {
        loader: require.resolve("url-loader"),
        options: {
            limit: 10000,
        },
        test: /\.(bmp|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    };

    /**
     * Define rule for transpiling TypeScript
     * @description Uncomment transpileOnly to Disable type checker - will use it in ForkTsCheckerWebpackPlugin at the cost of overlay.
     * Babel loader is present to support react-hot-loader.
     *
     * @todo Make configurable for CI and performance. Babel can also provide caching and polyfill
     * @todo Babel probably doesn't need to be run for server config
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
                    // Add decrators support and polyfill
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
                oneOf: [staticFileRule, typeScriptRule, scssRule, catchAllRule],
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
        fs: "empty",
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
                    terserOptions: {
                        safari10: true,
                    },
                }),
                new OptimizeCSSAssetsPlugin(),
            ],
            [],
        ),
        /**
         * @todo https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
         * @todo https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
         * @todo Also see how we can prevent specific vendor packages from being added to vendor js
         */
        splitChunks: {
            chunks: "all",
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
        path: resolvePath(`${buildPath}/public`, false),
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
            ...process.env,
            ...{
                NAME: name,
                NODE_ENV: ifProduction("production", "development"),
                PUBLIC_URL: publicPath,
                TARGET: target,
            },
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
         * Copy files
         * @env production
         */
        ifProduction(
            new CopyWebpackPlugin([
                {
                    from: resolvePath("public"),
                    ignore: ["*.html"],
                },
            ]),
            undefined,
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
         * Generates html file for offline use
         *
         * @env production
         */
        ifProduction(
            new HtmlWebpackPlugin({
                filename: resolvePath(
                    `${buildPath}/public/offline.html`,
                    false,
                ),
                inject: true,
                minify: {
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                },
                template: resolvePath("public/offline.html"),
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
        resolve,
        target,
    };
};

export default config;
