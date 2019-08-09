import Readme from "./README.md";

import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import MainMenu from "./MainMenu";

storiesOf("Components/Molecules/MainMenu", module)
    .add("default", () => {
        const value = boolean("fixed", true);
        return <MainMenu as="a" fixed={value} />;
    }, {
        notes: { markdown: Readme },
    });
