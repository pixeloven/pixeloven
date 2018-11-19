import { withReadme } from "storybook-readme";
import Readme from "./README.md";

import { boolean, number, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Button from "./Button";

storiesOf("Components/Atoms/Button", module)
    .addDecorator(withReadme(Readme))
    .add("Default", () => {
        const className = text("className", "");
        const href = text("href", "");
        const tabIndex = number("tabIndex", 0);
        const isDisabled = boolean("isDisabled", false);
        const isFullWidth = boolean("isFullWidth", false);
        const isHollow = boolean("isHollow", false);
        const isUnstyled = boolean("isUnstyled", false);
        return (
            <Button
                className={className}
                {...(href ? { href } : {})}
                {...(isDisabled ? { isDisabled } : {})}
                {...(isFullWidth ? { isFullWidth } : {})}
                {...(isHollow ? { isHollow } : {})}
                {...(isUnstyled ? { isUnstyled } : {})}
                {...(tabIndex ? { tabIndex } : {})}
            >
                View this thing
            </Button>
        );
    });
