import {createLocation, createMemoryHistory} from "history";
import React from "react";

import {MemoryRouter} from "@pixeloven-react/routing";
import {storiesOf} from "@storybook/react";

import Default from "./Default";
import Readme from "./README.md";

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
        notes: {markdown: Readme},
    },
);
