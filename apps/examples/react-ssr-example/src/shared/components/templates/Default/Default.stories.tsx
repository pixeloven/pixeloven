import Readme from "./README.md";

import { storiesOf } from "@storybook/react";

import { createLocation, createMemoryHistory } from "history";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import Default from "./Default";

const history = createMemoryHistory();
const location = createLocation("/testing");
const match = {
    isExact: false,
    params: {},
    path: "/",
    url: "testing",
};

storiesOf("Components/Templates/Default", module).add(
    "default",
    () => (
        <MemoryRouter>
            <Default history={history} location={location} match={match} />
        </MemoryRouter>
    ),
    {
        notes: { markdown: Readme },
    },
);
