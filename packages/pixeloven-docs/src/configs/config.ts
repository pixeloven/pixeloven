import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";

/**
 * Import remote assets dynamically
 */
import("" + "root/src/shared/styles").catch((error: Error) => {
    console.error("Failed to load scss files", error.message);
});

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
 */
const req = require.context("root", true, /.stories.[jt]sx?$/);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
