import { withReadme } from "storybook-readme";
import Readme from "./README.md";

import { storiesOf } from "@storybook/react";
import * as React from "react";
import Example from "./Example";

storiesOf("Components/Atoms/Example", module)
    .addDecorator(withReadme(Readme))
    .add("default", () => {
        return <Example example={"example"} />;
    });
