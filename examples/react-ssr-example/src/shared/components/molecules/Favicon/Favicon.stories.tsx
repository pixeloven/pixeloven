import { withReadme } from "storybook-readme";
import Readme from "./README.md";

import { storiesOf } from "@storybook/react";
import React from "react";
import Favicon from "./Favicon";

storiesOf("Components/Molecules/Favicon", module)
    .addDecorator(withReadme(Readme))
    .add("default", () => {
        return <Favicon />;
    });
