/**
 * @jest-environment jsdom
 */
import "jest";

import React from "react";
import * as ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const TestComponent = () => {
    return <div>testing</div>;
};

const routes = [
    {
        component: TestComponent,
        path: "/test",
    },
];

describe("App", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <App routes={routes} />
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
