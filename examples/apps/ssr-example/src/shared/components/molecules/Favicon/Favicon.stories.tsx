import Readme from "./README.md";

import { storiesOf } from "@storybook/react";
import React from "react";
import Favicon from "./Favicon";

storiesOf("Components/Molecules/Favicon", module).add(
    "default",
    () => {
        return <Favicon />;
    },
    {
        notes: { markdown: Readme },
    },
);
