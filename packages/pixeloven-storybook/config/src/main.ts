import getConfig from "./webpack";

module.exports = {
    addons: [
        require.resolve("@storybook/addon-options"),

        // Panels
        require.resolve("@storybook/addon-backgrounds"),
        require.resolve("@storybook/addon-notes"),
        require.resolve("@storybook/addon-viewport"),

        // Tabs
        require.resolve("@storybook/addon-knobs"),
        require.resolve("@storybook/addon-a11y"),
        require.resolve("@storybook/addon-actions"),
    ],
    stories: [process.cwd() + "/**/*.stories.[tj]s[x]"],
    webpackFinal: getConfig,
};
