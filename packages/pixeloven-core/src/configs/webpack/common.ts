import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TimeFixPlugin from "time-fix-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack, {Configuration, Options, Plugin, Resolve} from "webpack";
import {getIfUtils, removeEmpty} from "webpack-config-utils";
import Env from "../../libraries/Env";
import {resolvePath} from "../../macros";

/**
 * Utility functions to help segment configuration based on environment
 */
const {ifProduction, ifDevelopment} = getIfUtils(Env.current);

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
        new ModuleScopePlugin(resolvePath("src"), [resolvePath("package.json")]),
        new TsconfigPathsPlugin({ configFile: resolvePath("tsconfig.json") }),
    ],
};

/**
 * Common configuration
 */
const config: Configuration = {
    bail: ifProduction(),
    mode: ifProduction("production", "development"),
    performance,
    plugins,
    resolve,
};

export default config;
