import {createLocation, createMemoryHistory} from "history";
import React from "react";

import {MemoryRouter} from "@pixeloven-react/routing";

import Home from "./Home";

const history = createMemoryHistory();
const location = createLocation("/testing");
const match = {
    isExact: false,
    params: {
        example: "hello",
    },
    path: "/",
    url: "testing",
};

export default {
    component: Home,
    title: "Components/Pages/Home",
};

export const Primary = () => (
    <MemoryRouter>
        <Home history={history} location={location} match={match} />
    </MemoryRouter>
);
