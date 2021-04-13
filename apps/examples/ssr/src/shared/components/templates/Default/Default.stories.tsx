import {createLocation, createMemoryHistory} from "history";
import React from "react";

import {MemoryRouter} from "@pixeloven-react/routing";

import Default from "./Default";

const history = createMemoryHistory();
const location = createLocation("/testing");
const match = {
    isExact: false,
    params: {},
    path: "/",
    url: "testing",
};

export default {
    component: Default,
    title: "Components/Templates/Default",
};

export const Primary = () => (
    <MemoryRouter>
        <Default history={history} location={location} match={match} />
    </MemoryRouter>
);
