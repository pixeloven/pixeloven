import getConfig from "./webpack";

module.exports = {
    addons: [
        // Panels
        "@storybook/addon-backgrounds",
        "@storybook/addon-docs",
        "@storybook/addon-viewport",

        // Tabs
        "@storybook/addon-knobs",
        "@storybook/addon-a11y",
        "@storybook/addon-actions",
    ],
    stories: [process.cwd() + "/**/*.stories.[tj]s[x]"],
    webpackFinal: getConfig,
};
