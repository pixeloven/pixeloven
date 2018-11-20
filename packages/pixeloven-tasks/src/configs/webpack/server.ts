import { resolvePath } from "@pixeloven/core";
import { env } from "@pixeloven/env";
import webpack, { Module, Node, Output, Plugin, RuleSetRule } from "webpack";
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import merge from "webpack-merge";
import webpackNodeExternals from "webpack-node-externals";
import common from "./common";

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
    loader: "css-loader/locals",
    test: /\.(scss|sass|css)$/i,
};

/**
 * Define rule for static assets
 * @description "url" loader works like "file" loader except that it embeds assets
 * smaller than specified limit in bytes as data URLs to avoid requests.
 */
const staticFileRule: RuleSetRule = {
    loader: "url-loader",
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
    publicPath: ifProduction(publicPath, "/"),
};

/**
 * @description Plugins need to webpack to perform build
 */
const plugins: Plugin[] = removeEmpty([
    /**
     * Define environmental variables for application
     * @description For now we are only allowing a strict set to be exposed to the client.
     * @todo Should eventually move to this and make Env client/server agnostic. https://github.com/mrsteele/dotenv-webpack
     * @env all
     */
    new webpack.EnvironmentPlugin({
        NAME: name,
        NODE_ENV: ifProduction("production", "development"),
        PUBLIC_URL: publicPath,
        TARGET: target,
    }),
]);

/**
 * Server side configuration
 */
export default merge(common, {
    devtool: ifDevelopment("eval-source-map", false),
    entry,
    externals: [webpackNodeExternals()],
    module,
    name,
    node,
    output,
    plugins,
    target,
});
