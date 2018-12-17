import { resolvePath } from "@pixeloven/core";
import { env } from "@pixeloven/env";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import Dotenv from "dotenv-webpack";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TimeFixPlugin from "time-fix-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack, {
    Configuration,
    Module,
    Node,
    Options,
    Output,
    Plugin,
    Resolve,
    RuleSetRule,
} from "webpack";
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import webpackNodeExternals from "webpack-node-externals";

/**
 * Tell webpack what we are making :)
 */
const name = "server";
const target = "node";

/**
 * Utility functions to help segment configuration based on environment
 */
const { ifProduction, ifDevelopment } = getIfUtils(env.current);

/**
 * Webpack uses `publicPath` to determine where the app is being served from.
 * It requires a trailing slash, or the file assets will get an incorrect path.
 */
const publicPath = env.config("PUBLIC_URL", "/");
const buildPath = env.config("BUILD_PATH", "dist");

/**
 * Define entrypoint(s) for sever
 */
const entry = removeEmpty([
    ifProduction(
        resolvePath("src/server/index.ts"),
        resolvePath("src/server/webpack.ts"),
    ),
]);

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
        emitFile: false,
    },
};

/**
 * Handle css/scss
 */
const scssRule: RuleSetRule = {
    loader: require.resolve("css-loader/locals"),
    test: /\.(scss|sass|css)$/i,
};

/**
 * Define rule for static assets
 * @description "url" loader works like "file" loader except that it embeds assets
 * smaller than specified limit in bytes as data URLs to avoid requests.
 */
const staticFileRule: RuleSetRule = {
    loader: require.resolve("url-loader"),
    options: {
        emitFile: false,
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
            loader: require.resolve("babel-loader"),
        },
        {
            loader: require.resolve("ts-loader"),
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
 * @description Prevents these common globals from being overwritten
 */
const node: Node = {
    __dirname: false,
    __filename: false,
};

/**
 * @description Output instructions for server build
 */
const output: Output = {
    filename: "server.js",
    libraryTarget: "commonjs2",
    path: resolvePath(buildPath, false),
    publicPath,
};

/**
 * Define build performance options
 */
const performance: Options.Performance = {
    hints: ifDevelopment("warning", false),
};

/**
 * @description Plugins need to webpack to perform build
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
     * Define environmental from .env
     * @description Define environmental vars from .env file
     * @env all
     */
    new Dotenv({
        path: resolvePath(".env", false),
    }),
    /**
     * Perform type checking and linting in a separate process to speed up compilation
     * TODO might prevent showing errors in browser if async is off... but then again it breaks hmr overlay
     * @env all
     */
    // import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
    // ifProduction(new ForkTsCheckerWebpackPlugin({
    //     tsconfig: resolvePath("tsconfig.json"),
    //     tslint: resolvePath("tslint.json"),
    // }), new ForkTsCheckerWebpackPlugin({
    //     tsconfig: resolvePath("tsconfig.json"),
    //     tslint: resolvePath("tslint.json"),
    //     watch: resolvePath("src"),
    // })),
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
        new TsconfigPathsPlugin({ configFile: resolvePath("tsconfig.json") }),
    ],
};

/**
 * Server side configuration
 */
const config: Configuration = {
    bail: ifProduction(),
    devtool: ifDevelopment("eval-source-map", false),
    entry,
    externals: [
        // Exclude from local node_modules dir
        webpackNodeExternals(),
        // Exclude from file - helpful for lerna packages
        webpackNodeExternals({
            modulesFromFile: true,
        }),
    ],
    mode: ifProduction("production", "development"),
    module,
    name,
    node,
    output,
    performance,
    plugins,
    resolve,
    target,
};

export default config;
