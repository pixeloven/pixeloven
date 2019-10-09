import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import { createLocation, createMemoryHistory } from "history";
import "jest";
import React from "react";
import Home from "./Home";

configure({
    adapter: new ReactSixteenAdapter(),
});

const history = createMemoryHistory();
const location = createLocation("/");
const match = {
    isExact: false,
    params: {},
    path: "/",
    url: "",
};

describe("Shared/Components/Page/Home", () => {
    it("should render `Home` template", () => {
        const wrapper = shallow(
            <Home history={history} location={location} match={match} />,
        );
        expect(wrapper.length).toEqual(1);
    });
});
