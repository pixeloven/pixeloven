const path = require("path");
const deepmerge = require("deepmerge");

/**
 * Extend webpack config for storybook
 * @param baseConfig
 * @param env
 * @param defaultConfig
 * 
 * @todo https://storybook.js.org/configurations/typescript-config/
 * @todo Move this to the CLI or another new package.
 */
module.exports = (
    baseConfig,
    env,
    defaultConfig,
) => {
    const newTsRule = {
        include: path.resolve(__dirname, "../src/shared/components"),
        loader: require.resolve("ts-loader"),
        options: {
            configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
        test: /\.(ts|tsx)$/,
    };
    const newScssRule = {
        loaders: ["style-loader", "css-loader", "sass-loader"], // TODO update to be the same as app
        test: /\.(scss|sass|css)$/i,
    };
    const newModule = {
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
