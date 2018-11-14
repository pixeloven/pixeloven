import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { addDecorator, configure } from "@storybook/react";
import "../src/shared/styles/core/core.scss";
import "./index.scss";

setOptions({
    downPanelInRight: true,
    goFullScreen: false,
    name: "TypeScript React",
    showDownPanel: true,
    showLeftPanel: true,
    showSearchBox: false,
});
addDecorator(withKnobs);

// Stories loader
const req = require.context(
    "../src/shared/components",
    true,
    /.stories.[jt]sx?$/,
);
function loadStories() {
    req.keys().forEach(req);
}

// Initialize react-storybook
configure(loadStories, module);
