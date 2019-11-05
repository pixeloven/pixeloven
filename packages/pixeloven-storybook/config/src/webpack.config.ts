import { resolveSourceRoot, resolveTsConfig } from "@pixeloven-core/filesystem";
import deepmerge from "deepmerge";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration, Module, RuleSetRule } from "webpack";

interface Options {
    config: Configuration;
}

/**
 * @todo Join this with the one in our webpack share config
 */
export const newScssRule: RuleSetRule = {
    include: resolveSourceRoot(),
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
};

/**
 * @todo Join this with the one in our webpack share config
 */
export const newTsRule: RuleSetRule = {
    include: resolveSourceRoot(),
    test: /\.(ts|tsx)$/,
    use: [
        {
            loader: require.resolve("babel-loader"),
        },
        {
            loader: require.resolve("ts-loader"),
            options: {
                configFile: resolveTsConfig(),
            },
        },
    ],
};

export const newModule: Module = {
    rules: [newScssRule, newTsRule],
};

/**
 * Extend webpack config for storybook
 */
export default (options: Options) => {
    const { config } = options;
    if (config.module) {
        config.module = deepmerge(config.module, newModule);
    }
    if (config.resolve) {
        // Aliases
        if (config.resolve.alias) {
            config.resolve.alias["@src"] = resolveSourceRoot();
        } else {
            config.resolve.alias = {
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
        // Plugins
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
};
