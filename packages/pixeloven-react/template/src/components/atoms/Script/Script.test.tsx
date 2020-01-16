import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import React from "react";
import Script from "./Script";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Server", () => {
    describe("Views", () => {
        describe("ScriptTags", () => {
            it("should render an `script` elem with an `src` attr", () => {
                const assetFile = "assets/js/main.js";
                const wrapper = shallow(<Script src={[assetFile]} />);
                const scriptTag = wrapper.find("script");
                expect(scriptTag.length).toEqual(1);
                expect(scriptTag.props().src).toBe(assetFile);
            });
            it("should render multiple `script` elems each with an `src` attr", () => {
                const assetFiles = ["assets/js/main.js", "assets/js/vendor.js"];
                const wrapper = shallow(<Script src={assetFiles} />);
                const scriptTags = wrapper.find("script");
                expect(scriptTags.length).toEqual(2);
                scriptTags.forEach((scriptTag, index) => {
                    expect(scriptTag.props().src).toBe(assetFiles[index]);
                });
            });
        });
    });
});
