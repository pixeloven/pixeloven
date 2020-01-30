import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";

import React from "react";
import App from "./App";

configure({
    adapter: new ReactSixteenAdapter(),
});

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
        const wrapper = shallow(<App routes={routes} />);
        expect(wrapper.find("Routes").length).toEqual(1);
    });
});
