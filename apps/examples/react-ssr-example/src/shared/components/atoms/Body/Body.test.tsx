import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import React from "react";
import Body from "./Body";

configure({
    adapter: new ReactSixteenAdapter(),
});

const contentString = "<h1>test</h1>";

describe("Server", () => {
    describe("Views", () => {
        describe("Body", () => {
            it("should render body with child string", () => {
                const wrapper = shallow(
                    <Body scripts={<React.Fragment />}>{contentString}</Body>,
                );
                expect(wrapper.find("body").length).toEqual(1);
                expect(wrapper.find("div").length).toEqual(2);
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
            });
        });
    });
});
