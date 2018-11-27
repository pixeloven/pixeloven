import { resolvePath } from "@pixeloven/core";
import { env } from "@pixeloven/env";
import autoprefixer from "autoprefixer";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OfflinePlugin from "offline-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import webpack, {
    DevtoolModuleFilenameTemplateInfo,
    Module,
    Node,
    Options,
    Output,
    Plugin,
    RuleSetRule,
} from "webpack";
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import merge from "webpack-merge";
import common from "./common";

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
 * Utility functions to help segment configuration based on environment
 */
const { ifProduction, ifDevelopment } = getIfUtils(env.current);

/**
 * Webpack uses `publicPath` to determine where the app is being served from.
 * It requires a trailing slash, or the file assets will get an incorrect path.
 *
 * @todo DEV needs to be / to serve assets :( but this breaks the bundle.js (server side is fine)
 * @todo Maybe do this in Output instead of here because some stuff might still need this.
 */
const publicPath = env.config("PUBLIC_URL", "/");
const buildPath = env.config("BUILD_PATH", "dist");

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
        ifDevelopment(
            "webpack-hot-middleware/client?reload=true&path=__webpack_hmr",
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
        browsers: [
            ">1%",
            "last 4 versions",
            "Firefox ESR",
            "not ie < 9", // React doesn"t support IE8 anyway
        ],
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
        name: ifProduction("[name].[contenthash].[ext]", "[name].[hash].[ext]"),
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
            loader: "css-hot-loader",
        }),
        MiniCssExtractPlugin.loader,
        {
            loader: "css-loader",
        },
        {
            loader: "postcss-loader",
            options: {
                ident: "postcss",
                plugins: postCssPlugin,
            },
        },
        {
            loader: "sass-loader",
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
 */
const typeScriptRule: RuleSetRule = {
    include: resolvePath("src"),
    test: /\.(ts|tsx)$/,
    use: [
        {
            loader: "babel-loader",
        },
        {
            loader: "ts-loader",
            options: {
                configFile: resolvePath("tsconfig.json"),
                // transpileOnly: true,
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
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        comparisons: false,
                        warnings: false,
                    },
                    output: {
                        ascii_only: true,
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
        [],
    ),
    splitChunks: {
        chunks: "all",
    },
};

/**
 * @description Output instructions for client build
 */
const output: Output = {
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
    publicPath: ifProduction(publicPath, "/"),
};

/**
 * @description Plugins for client specific builds
 */
const plugins: Plugin[] = removeEmpty([
    /**
     * Define environmental variables base on entry point
     * @description Provides entry point specific env variables
     * @todo Should merge this and the one below eventually
     *
     * @env all
     */
    new webpack.EnvironmentPlugin({
        NAME: name,
        NODE_ENV: ifProduction("production", "development"),
        PUBLIC_URL: publicPath,
        TARGET: target,
    }),

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
            filename: resolvePath(`${buildPath}/public/offline.html`, false),
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
     * Generate a service worker script that will pre-cache, and keep up to date,
     * the HTML & assets that are part of the Webpack build.
     *
     * @env production
     */
    ifProduction(
        new OfflinePlugin({
            ServiceWorker: {
                events: true,
            },
            appShell: "/offline.html",
            caches: {
                additional: [":externals:"],
                externals: ["/offline.html"],
                main: [":rest:"],
            },
            responseStrategy: "network-first", // 'cache-first' // TODO any way to do this and detect offline?
            safeToUseOptionalCaches: true,
        }),
        undefined,
    ),
    /**
     * This is necessary to emit hot updates (currently CSS only):
     *
     * @env development
     */
    ifDevelopment(new webpack.HotModuleReplacementPlugin(), undefined),
]);

/**
 * Client side configuration
 */
export default merge(common, {
    devtool: ifDevelopment("eval-source-map", false),
    entry,
    module,
    name,
    node,
    optimization,
    output,
    plugins,
    target,
});
