import { withKnobs } from "@storybook/addon-knobs";
import { withNotes } from "@storybook/addon-notes";
import { withOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";
import path from "path";

/**
 * Import remote assets dynamically
 */
import("" + "@src/shared/styles").catch((error: Error) => {
    console.error("Failed to load scss files", error.message);
});

/**
 * Import storybook styles
 */
import(path.resolve(__dirname, "./index.scss"));

/**
 * Setup storybook addons
 */
addDecorator(
    withOptions({
        addonPanelInRight: true,
        goFullScreen: false,
        name: "Storybook React",
        showSearchBox: false,
    }),
);
addDecorator(withKnobs);
addDecorator(withNotes);

/**
 * Stories loader
 */
const req = require.context("@src/shared", true, /.stories.[jt]sx?$/);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
