import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Link from "./Link";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Shared/Components/Atoms/Link", () => {
    it("should render an `link` elem with an `href` attr", () => {
        const assetFile = "assets/css/main.css";
        const wrapper = shallow(<Link href={[assetFile]} rel="stylesheet" />);
        const linkTag = wrapper.find("link");
        expect(linkTag.length).toEqual(1);
        expect(linkTag.props().href).toBe(assetFile);
    });
    it("should render multiple `link` elems each with an `href` attr", () => {
        const assetFiles = ["assets/css/main.css", "assets/css/vendor.css"];
        const wrapper = shallow(<Link href={assetFiles} rel="stylesheet" />);
        const linkTags = wrapper.find("link");
        expect(linkTags.length).toEqual(2);
        linkTags.forEach((linkTag, index) => {
            expect(linkTag.props().href).toBe(assetFiles[index]);
        });
    });
});
