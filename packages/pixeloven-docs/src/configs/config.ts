import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";
import { importLocalAsset, importRemoteAsset } from "./macros";

/**
 * Import remote assets
 */
importRemoteAsset("src/shared/styles/core/core.scss");

/**
 * Import storybook styles
 */
importLocalAsset("./index.scss");

/**
 * Set options for storybook
 */
setOptions({
    downPanelInRight: true,
    goFullScreen: false,
    name: "Storybook React",
    showDownPanel: true,
    showLeftPanel: true,
    showSearchBox: false,
});
addDecorator(withKnobs);

/**
 * Stories loader
 * @todo Find a way to do this with process.cwd()
 */
const req = require.context(
    "../../../../../../src/shared/components",
    true,
    /.stories.[jt]sx?$/,
);
function loadStories() {
    req.keys().forEach(value => console.log(value));
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
