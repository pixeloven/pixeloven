import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";
import { importRemoteAsset } from "./macros";

/**
 * Import remote assets dynamically
 */
importRemoteAsset("src/shared/styles/core/core.scss");

/**
 * Import storybook styles
 */
import "./index.scss";

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
    "./src/shared/components",
    true,
    /.stories.[jt]sx?$/,
);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
