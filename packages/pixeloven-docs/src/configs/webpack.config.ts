import deepmerge from "deepmerge";
import { Configuration, Module, RuleSetRule } from "webpack";
import { resolveSourceRoot, resolveTsConfig } from "./macros";

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
    const newTsRule: RuleSetRule = {
        loader: "ts-loader",
        options: {
            configFile: resolveTsConfig(),
        },
        test: /\.(ts|tsx)$/,
    };
    const newScssRule: RuleSetRule = {
        loaders: ["style-loader", "css-loader", "sass-loader"], // TODO update to be the same as app
        test: /\.(scss|sass|css)$/i,
    };
    const newModule: Module = {
        rules: [newTsRule, newScssRule],
    };
    if (defaultConfig.module) {
        defaultConfig.module = deepmerge(defaultConfig.module, newModule);
    }
    if (defaultConfig.resolve) {
        if (defaultConfig.resolve.alias) {
            defaultConfig.resolve.alias.source = resolveSourceRoot();
        } else {
            defaultConfig.resolve.alias = {
                source: resolveSourceRoot(),
            };
        }
        if (defaultConfig.resolve.extensions) {
            defaultConfig.resolve.extensions.push(".ts", ".tsx");
        }
    }
    return defaultConfig;
};
