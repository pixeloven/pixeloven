import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, addParameters, configure } from "@storybook/react";

/**
 * Import remote assets dynamically
 * @todo Find a way to do this through a Decorator or something
 * @todo Make readme the default if it exists?  Can we hide actions? what does it even do?
 */
import("" + "@src/shared/styles").catch((error: Error) => {
    console.error("Failed to load scss files", error.message);
});

addDecorator(withA11y);
addDecorator(withKnobs);

/**
 * Setup storybook addons
 * @todo options in menu are overriden after you do anything how can we prevent this?
 */
addParameters({ 
    a11y: {
        config: {},
        options: {
          checks: { 'color-contrast': { options: { noScroll: true } } },
          restoreScroll: true,
        },
    },
    backgrounds: [
        { name: "default", value: "transparent", default: true },
        { name: "#000", value: "#000000", default: false },
        { name: "#333", value: "#333333", default: false },
        { name: "twitter", value: "#00aced", default: false },
        { name: "facebook", value: "#3b5998", default: false },
    ],
    options: {
        isFullScreen: false,
        panelPosition: 'right',
        showSearchBox: false,
        theme: {
            brandTitle: "Storybook React",
        },
    },
});

/**
 * Stories loader
 */
const req = require.context("@src/shared", true, /.stories.[jt]sx?$/);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
