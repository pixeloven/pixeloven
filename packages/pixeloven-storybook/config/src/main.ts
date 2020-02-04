import getConfig from "./webpack";

module.exports = {
    addons: [
        "@storybook/addon-options",

        // Panels
        "@storybook/addon-backgrounds",
        "@storybook/addon-notes",
        "@storybook/addon-viewport",

        // Tabs
        "@storybook/addon-knobs",
        "@storybook/addon-a11y",
        "@storybook/addon-actions",
    ],
    stories: ["./**/*.stories.[tj]s"],
    webpackFinal: getConfig,
};
