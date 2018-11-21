import deepmerge from "deepmerge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
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
    const newScssRule: RuleSetRule = {
        loaders: [
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
        ],
        test: /\.(scss|sass|css)$/i,
    };
    const newTsRule: RuleSetRule = {
        include: resolveSourceRoot(),
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: "babel-loader",
            },
            {
                loader: "ts-loader",
                options: {
                    configFile: resolveTsConfig(),
                },
            },
        ],
    };
    const newModule: Module = {
        rules: [newScssRule, newTsRule],
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
