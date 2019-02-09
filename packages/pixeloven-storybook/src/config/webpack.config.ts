import deepmerge from "deepmerge";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration, Module, RuleSetRule } from "webpack";
import { resolveSourceRoot, resolveTsConfig } from "./macros";

export const newScssRule: RuleSetRule = {
    loaders: [
        require.resolve("style-loader"),
        require.resolve("css-loader"),
        require.resolve("sass-loader"),
    ],
    test: /\.(scss|sass|css)$/i,
};

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
 * @param baseConfig
 * @param env
 * @param defaultConfig
 */
export default (
    baseConfig: Configuration,
    env: object,
    defaultConfig: Configuration,
) => {
    if (defaultConfig.module) {
        defaultConfig.module = deepmerge(defaultConfig.module, newModule);
    }
    if (defaultConfig.resolve) {
        // Aliases
        if (defaultConfig.resolve.alias) {
            defaultConfig.resolve.alias["@src"] = resolveSourceRoot();
        } else {
            defaultConfig.resolve.alias = {
                "@src": resolveSourceRoot(),
            };
        }
        // Extensions
        if (defaultConfig.resolve.extensions) {
            defaultConfig.resolve.extensions.push(".ts", ".tsx");
        } else {
            defaultConfig.resolve.extensions = [".ts", ".tsx"];
        }
        // Modules
        if (defaultConfig.resolve.modules) {
            defaultConfig.resolve.modules.push(resolveSourceRoot());
            defaultConfig.resolve.modules.push("node_modules");
        } else {
            defaultConfig.resolve.modules = [
                resolveSourceRoot(),
                "node_modules",
            ];
        }
        // Plugins
        const tsPathPlugin = new TsconfigPathsPlugin({
            configFile: resolveTsConfig(),
        });
        if (defaultConfig.resolve.plugins) {
            defaultConfig.resolve.plugins.push(tsPathPlugin);
        } else {
            defaultConfig.resolve.plugins = [tsPathPlugin];
        }
    }
    return defaultConfig;
};
