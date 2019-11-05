import Readme from "./README.md";

import { storiesOf } from "@storybook/react";
import React from "react";
import Logo from "./Logo";

storiesOf("Logo", module).add(
    "Default",
    () => {
        return <Logo speed={"30s"} />;
    },
    {
        notes: { markdown: Readme },
    },
);
