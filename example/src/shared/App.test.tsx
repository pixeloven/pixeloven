import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter basename="/">
                <App />
            </BrowserRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
