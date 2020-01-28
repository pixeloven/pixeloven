import { resolveSourceRoot, resolveTsConfig } from "@pixeloven-core/filesystem";
import tsLoader from "@pixeloven-webpack/ts-loader";
import deepmerge from "deepmerge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration } from "webpack";

interface Options {
    config: Configuration;
    mode: string;
}

/**
 * Extend webpack config for storybook
 */
async function getConfig(options: Options) {
    const { config } = options;
    const modules = {
        rules: [
            {
                test: [/\.(ts|tsx)$/],
                use: tsLoader,
            },
            {
                test: /\.(scss|sass|css)$/i,
                use: [
                    {
                        loader: require.resolve("style-loader"),
                    },
                    {
                        loader: require.resolve("css-loader"),
                    },
                    {
                        loader: require.resolve("sass-loader"),
                        options: {
                            // Prefer `dart-sass`
                            implementation: require("sass"),
                        },
                    },
                ],
            },
        ],
    };
    config.module = config.module ? deepmerge(config.module, modules) : modules;

    // Plugins
    // @todo we should use the same setup as webpack and also this should have two modes
    const forkTsPlugin = new ForkTsCheckerWebpackPlugin({
        silent: true,
        tsconfig: resolveTsConfig(),
    });
    if (config.plugins) {
        config.plugins.push(forkTsPlugin);
    } else {
        config.plugins = [forkTsPlugin];
    }
    if (config.resolve) {
        // Aliases
        if (config.resolve.alias) {
            // change to @cwd so that stories locally run from the working directory and on jenkins from root
            config.resolve.alias["@cwd"] = process.cwd();
            config.resolve.alias["@src"] = resolveSourceRoot();
        } else {
            config.resolve.alias = {
                "@cwd": process.cwd(),
                "@src": resolveSourceRoot(),
            };
        }
        // Extensions
        if (config.resolve.extensions) {
            config.resolve.extensions.push(".ts", ".tsx");
        } else {
            config.resolve.extensions = [".ts", ".tsx"];
        }
        // Modules
        if (config.resolve.modules) {
            config.resolve.modules.push(resolveSourceRoot());
            config.resolve.modules.push("node_modules");
        } else {
            config.resolve.modules = [resolveSourceRoot(), "node_modules"];
        }
        // Resolve
        const tsPathPlugin = new TsconfigPathsPlugin({
            configFile: resolveTsConfig(),
        });
        if (config.resolve.plugins) {
            config.resolve.plugins.push(tsPathPlugin);
        } else {
            config.resolve.plugins = [tsPathPlugin];
        }
    }
    return config;
}

export default getConfig;
