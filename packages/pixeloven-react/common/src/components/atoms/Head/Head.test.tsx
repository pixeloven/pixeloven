import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import React from "react";
import Head from "./Head";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Server", () => {
    describe("Views", () => {
        describe("Head", () => {
            it("should render basic head", () => {
                const wrapper = shallow(
                    <Head>
                        <meta />
                    </Head>,
                );
                expect(wrapper.find("head").length).toEqual(1);
                expect(wrapper.find("Link").length).toEqual(0);
                expect(wrapper.find("meta").length).toEqual(1);
            });
        });
    });
});
