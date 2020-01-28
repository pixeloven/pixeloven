import { withA11y } from "@storybook/addon-a11y";
import { withBackgrounds } from "@storybook/addon-backgrounds";
import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { themes } from "@storybook/theming";

addDecorator(withA11y);
addDecorator(withBackgrounds);
addDecorator(withKnobs);

/**
 * Setup storybook addons
 * @todo Make this configurable through universal config
 */
addParameters({
    a11y: {
        config: {},
        options: {
            checks: {
                "color-contrast": {
                    options: {
                        noScroll: true,
                    },
                },
            },
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
        panelPosition: "right",
        showSearchBox: false,
        theme: themes.light,
    },
});

/**
 * Stories loader
 */
/* tslint:disable no-string-literal */
const req = require["context"]("@cwd", true, /.stories.[jt]sx?$/);
function loadStories() {
    req.keys().forEach(req);
}
/* tslint:enable no-string-literal */

// Initialize react-storybook
configure(loadStories, module);
