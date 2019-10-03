import Readme from "./README.md";

import { boolean, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Logo from "./Logo";

storiesOf("Logo", module).add(
    "Default",
    () => {
        return <Logo />;
    },
    {
        notes: { markdown: Readme },
    },
);
