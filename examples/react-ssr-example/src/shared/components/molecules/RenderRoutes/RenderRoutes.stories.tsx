import { withReadme } from "storybook-readme";
import Readme from "./README.md";

import { storiesOf } from "@storybook/react";
import * as React from "react";
import RenderRoutes from "./RenderRoutes";

const TestComponent = () => {
    return <div>testing</div>;
};

const routes = [
    {
        component: TestComponent,
    },
];

storiesOf("Components/Molecules/RenderRoutes", module)
    .addDecorator(withReadme(Readme))
    .add("default", () => {
        return <RenderRoutes routes={routes} />;
    });
