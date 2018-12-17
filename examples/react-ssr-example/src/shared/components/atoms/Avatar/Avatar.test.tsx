import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Avatar from "./Avatar";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Atom Avatar Component", () => {
    it("should render an `img` elem with the `src` and `srcSet` attrs if passed an `avatarURL` prop", () => {
        const expectedSrcSet = `
            http://test.url/38,
            http://test.url/76 2x,
            http://test.url/114 3x,
            http://test.url/152 4x
        `;
        const wrapper = shallow(<Avatar avatarURL="http://test.url" />);
        expect(wrapper.type()).toBe("img");
        expect(wrapper.props().src).toBe("http://test.url/38");
        expect(wrapper.props().srcSet).toBe(expectedSrcSet);
    });

    it("should include the `alt` attr if passed an `avatarName` prop", () => {
        const wrapper = shallow(
            <Avatar avatarURL="http://test.url" avatarName="Test User" />,
        );
        expect(wrapper.type()).toBe("img");
        expect(wrapper.props().alt).toBe("Test User");
    });

    it("should render a div elem and include the `--initials` modifier if passed the `avatarInitials` but not the `avatarURL` prop", () => {
        const wrapper = shallow(<Avatar avatarInitials="TU" />);
        expect(wrapper.type()).toBe("div");
        expect(wrapper.hasClass("a-avatar--initials")).toBe(true);
        expect(wrapper.text()).toBe("TU");
    });

    it("should render a `div` elem with the `--anonymous` modifier if `avatarURL` and `avatarInitials` props are not passed", () => {
        const wrapper = shallow(<Avatar />);
        expect(wrapper.type()).toBe("div");
        expect(wrapper.hasClass("a-avatar--anonymous")).toBe(true);
    });
});
