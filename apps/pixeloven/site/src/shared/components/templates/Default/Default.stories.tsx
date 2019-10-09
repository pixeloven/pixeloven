import { storiesOf } from "@storybook/react";
import { createLocation, createMemoryHistory } from "history";
import React from "react";
import Default from "./Default";
import Readme from "./README.md";

const history = createMemoryHistory();
const location = createLocation("/");
const match = {
    isExact: false,
    params: {},
    path: "/",
    url: "",
};

storiesOf("Shared/Components/Templates/Default", module).add(
    "default",
    () => {
        return <Default history={history} location={location} match={match} />;
    },
    {
        notes: { markdown: Readme },
    },
);
