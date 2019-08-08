import { withReadme } from "storybook-readme";
import Readme from "./README.md";

import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import MainMenu from "./MainMenu";

storiesOf("Components/Molecules/MainMenu", module)
    .addDecorator(withReadme(Readme))
    .add("default", () => {
        const value = boolean("fixed", true);
        return <MainMenu as="a" fixed={value} />;
    });
