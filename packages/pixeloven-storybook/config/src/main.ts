import getConfig from "./webpack";

module.exports = {
    addons: [
        // Panels
        "@storybook/addon-docs",

        // Tabs
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
    ],
    stories: [process.cwd() + "/**/*.stories.@(js|ts|jsx|tsx|mdx)"],
    webpackFinal: getConfig,
};
