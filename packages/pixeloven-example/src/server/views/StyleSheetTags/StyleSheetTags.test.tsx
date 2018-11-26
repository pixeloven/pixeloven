import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import StyleSheetTags from "./StyleSheetTags";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Server", () => {
    describe("Views", () => {
        describe("StyleSheetTags", () => {
            it("should render nothing when `hrefs` is undefined", () => {
                const wrapper = shallow(<StyleSheetTags />);
                const scriptTag = wrapper.find("link");
                expect(scriptTag.length).toEqual(0);
            });
            it("should render an `link` elem with an `href` attr", () => {
                const assetFile = "assets/css/main.css";
                const wrapper = shallow(<StyleSheetTags hrefs={[assetFile]} />);
                const scriptTag = wrapper.find("link");
                expect(scriptTag.length).toEqual(1);
                expect(scriptTag.props().href).toBe(assetFile);
            });
            it("should render multiple `link` elems each with an `href` attr", () => {
                const assetFiles = [
                    "assets/css/main.css",
                    "assets/css/vendor.css",
                ];
                const wrapper = shallow(<StyleSheetTags hrefs={assetFiles} />);
                const scriptTags = wrapper.find("link");
                expect(scriptTags.length).toEqual(2);
                scriptTags.forEach((scriptTag, index) => {
                    expect(scriptTag.props().href).toBe(assetFiles[index]);
                });
            });
        });
    });
});
