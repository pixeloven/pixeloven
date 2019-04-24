import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Head from "./Head";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Server", () => {
    describe("Views", () => {
        describe("Head", () => {
            it("should render basic head", () => {
                const wrapper = shallow(<Head />);
                expect(wrapper.find("head").length).toEqual(1);
                expect(wrapper.find("Link").length).toEqual(0);
                expect(wrapper.find("Favicon").length).toEqual(1);
            });
            it("should render head with css files", () => {
                const files = {
                    css: ["main.css"],
                };
                const wrapper = shallow(<Head files={files} />);
                expect(wrapper.find("head").length).toEqual(1);
                expect(wrapper.find("Link").length).toEqual(1);
                expect(wrapper.find("Favicon").length).toEqual(1);
            });
        });
    });
});
