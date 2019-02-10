import { configure, mount } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Html from "./Html";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Server", () => {
    describe("Views", () => {
        describe("Html", () => {
            it("should render template and `children`", () => {
                const wrapper = mount(
                    <Html>
                        <h1>test</h1>
                    </Html>,
                );
                expect(wrapper.find("html").length).toEqual(1);
                expect(wrapper.find("head").length).toEqual(1);
                expect(wrapper.find("body").length).toEqual(1);
                expect(wrapper.find("div").props().id).toEqual("root");
                expect(wrapper.find("div").find("h1").length).toEqual(1);
            });
        });
    });
});
