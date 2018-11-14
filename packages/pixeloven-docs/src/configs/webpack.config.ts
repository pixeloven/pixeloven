import deepmerge from "deepmerge";
import path from "path";
import { Configuration, Module, RuleSetRule } from "webpack";

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
        include: path.resolve(process.cwd(), "src/shared/components"),
        loader: require.resolve("ts-loader"),
        options: {
            configFile: path.resolve(process.cwd(), "tsconfig.json"),
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
    if (defaultConfig.resolve && defaultConfig.resolve.extensions) {
        defaultConfig.resolve.extensions.push(".ts", ".tsx");
    }
    return defaultConfig;
};
