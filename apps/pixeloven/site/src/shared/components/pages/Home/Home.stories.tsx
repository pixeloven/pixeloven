import { storiesOf } from "@storybook/react";
import { createLocation, createMemoryHistory } from "history";
import React from "react";
import Home from "./Home";
import Readme from "./README.md";

const history = createMemoryHistory();
const location = createLocation("/");
const match = {
    isExact: false,
    params: {},
    path: "/",
    url: "",
};

storiesOf("Shared/Components/Page/Home", module).add(
    "default",
    () => {
        return <Home history={history} location={location} match={match} />;
    },
    {
        notes: { markdown: Readme },
    },
);
