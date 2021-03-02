import React from "react";
import { storiesOf } from "@storybook/react";

import Logo from "./Logo";
import Readme from "./README.md";

storiesOf("@src/atoms/Logo", module).add(
    "Default",
    () => {
        return <Logo speed={"30s"} />;
    },
    {
        notes: { markdown: Readme },
    },
);
