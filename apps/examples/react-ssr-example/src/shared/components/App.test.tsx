import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";

import { createLocation, createMemoryHistory } from "history";
import React from "react";
import App from "./App";

configure({
    adapter: new ReactSixteenAdapter(),
});

const history = createMemoryHistory();
const location = createLocation("/testing");
const match = {
    isExact: false,
    params: {},
    path: "/",
    url: "testing",
};

const TestComponent = () => {
    return <div>testing</div>;
};

const routes = [
    {
        component: TestComponent,
        path: "/test",
    },
];

/**
 * @todo Find a way to mount instead of shallow
 */
describe("App", () => {
    it("render with routes", () => {
        const wrapper = shallow(
            <App
                routes={routes}
                history={history}
                location={location}
                match={match}
            />,
        );
        expect(wrapper.find("Routes").length).toEqual(1);
    });
});
