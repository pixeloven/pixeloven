import { withReadme } from "storybook-readme";
import Readme from "./README.md";

import { storiesOf } from "@storybook/react";

import {createLocation, createMemoryHistory} from "history";
import React from "react";
import Blog from "./Blog";

const history = createMemoryHistory();
const location = createLocation("/testing");
const match = {
    isExact: false,
    params: {},
    path: "/",
    url: "testing",
};

storiesOf("Components/Pages/Blog", module)
    .addDecorator(withReadme(Readme))
    .add("default", () => {
        return <Blog history={history} location={location} match={match}/>;
    });
