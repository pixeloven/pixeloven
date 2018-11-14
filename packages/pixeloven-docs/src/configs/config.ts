import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";

/**
 * Import remote assets dynamically
 */
import("" + "../../../../../../src/shared/styles").catch((error: Error) => {
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
 * @todo Find a way to do this with process.cwd()
 */
const req = require.context(
    "../../../../../../src/shared/components",
    true,
    /.stories.[jt]sx?$/,
);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
