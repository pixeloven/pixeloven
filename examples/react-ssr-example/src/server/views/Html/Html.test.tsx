import { configure, shallow } from "enzyme";
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
                const wrapper = shallow(
                    <Html lang={"en"}>
                        <h1>test</h1>
                    </Html>,
                );
                expect(wrapper.find("html").length).toEqual(1);
                expect(wrapper.find("Head").length).toEqual(1);
                expect(wrapper.find("Body").length).toEqual(1);
            });
        });
    });
});
