import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
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
            <BrowserRouter basename="/">
                <App routes={routes} />
            </BrowserRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
