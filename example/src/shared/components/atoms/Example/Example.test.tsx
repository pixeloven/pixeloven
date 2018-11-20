import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Example from "./Example";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Components", () => {
    describe("Atoms", () => {
        describe("Example", () => {
            it("should render null", () => {
                const wrapper = shallow(<Example />);
                expect(wrapper.type()).toBeNull();
            });
            it("should render null", () => {
                const wrapper = shallow(<Example example={"example"} />);
                expect(wrapper.find("div").text()).toEqual("example");
            });
        });
    });
});
