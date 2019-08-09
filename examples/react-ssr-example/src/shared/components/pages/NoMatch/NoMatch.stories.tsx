import Readme from "./README.md";

import { storiesOf } from "@storybook/react";

import { createLocation, createMemoryHistory } from "history";
import React from "react";
import NoMatch from "./NoMatch";

const history = createMemoryHistory();
const location = createLocation("/testing");
const match = {
    isExact: false,
    params: {},
    path: "/",
    url: "testing",
};

storiesOf("Components/Pages/NoMatch", module)
    .add("default", () => {
        return <NoMatch history={history} location={location} match={match} />;
    }, {
        notes: { markdown: Readme },
    });
