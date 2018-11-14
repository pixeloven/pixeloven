import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";
import {
    importLocalAsset,
    importRemoteAsset,
    resolveSharedComponents,
} from "./macros";

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

// Stories loader
const req = require.context(
    resolveSharedComponents(),
    true,
    /.stories.[jt]sx?$/,
);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
