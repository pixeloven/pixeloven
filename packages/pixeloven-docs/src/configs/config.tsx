import { withBackgrounds } from "@storybook/addon-backgrounds";
import { withKnobs } from "@storybook/addon-knobs";
import { withOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";
import React from 'react';
/**
 * Import remote assets dynamically
 */
import("" + "@src/shared/styles").catch((error: Error) => {
    console.error("Failed to load scss files", error.message);
});

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
addDecorator(
    withBackgrounds([
        { name: "default", value: "transparent", default: true },
        { name: "twitter", value: "#00aced", default: false },
        { name: "facebook", value: "#3b5998", default: false },
    ]),
);
addDecorator(withKnobs);

/**
 * Wrapper with custom id for modals to attach to
 */
const modalContainerDecorator = (storyFn: () => {}) => (
    <>
        <div id="modal-root" />
        <div id="root">
            {storyFn()}
        </div>
    </>
);
addDecorator(modalContainerDecorator);

/**
 * Stories loader
 */
const req = require.context("@src/shared", true, /.stories.[jt]sx?$/);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);