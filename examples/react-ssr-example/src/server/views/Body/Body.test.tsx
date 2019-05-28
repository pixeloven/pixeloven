import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import React from "react";
import Body from "./Body";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Server", () => {
    describe("Views", () => {
        describe("Body", () => {
            it("should render body with child", () => {
                const files = {
                    js: ["main.js"],
                };
                const wrapper = shallow(
                    <Body files={files}>
                        <h1>test</h1>
                    </Body>,
                );
                expect(wrapper.find("body").length).toEqual(1);
                expect(wrapper.find("div").length).toEqual(2);
                expect(wrapper.find("script").length).toEqual(1);
                expect(
                    wrapper
                        .find("div")
                        .last()
                        .props().id,
                ).toEqual("root");
                expect(
                    wrapper
                        .find("div")
                        .first()
                        .props().id,
                ).toEqual("portal");
                expect(
                    wrapper
                        .find("div")
                        .last()
                        .find("h1").length,
                ).toEqual(1);
            });
        });
    });
});
