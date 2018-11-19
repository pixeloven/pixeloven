import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Icon from "./Icon";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Atom Icon Component", () => {
    it("should render an `svg` elem with an `href` attr", () => {
        const wrapper = shallow(<Icon iconType="test" iconName="icon" />);
        expect(wrapper.type()).toBe("svg");
        expect(wrapper.find("use").props().href).toBe(
            "/static/media/test-icons.svg#test-icon",
        );
    });

    it("should extend passed classes", () => {
        const wrapper = shallow(
            <Icon iconType="test" iconName="icon" className="test-class" />,
        );
        expect(wrapper.hasClass("a-icon")).toBe(true);
        expect(wrapper.hasClass("test-class")).toBe(true);
    });

    it("should include the `--after-text` modifier if passed the `isAfterText` prop", () => {
        const wrapper = shallow(
            <Icon iconType="test" iconName="icon" isAfterText={true} />,
        );
        expect(wrapper.hasClass("a-icon--after-text")).toBe(true);
    });

    it("should include the `--before-text` modifier if passed the `isBeforeText` prop", () => {
        const wrapper = shallow(
            <Icon iconType="test" iconName="icon" isBeforeText={true} />,
        );
        expect(wrapper.hasClass("a-icon--before-text")).toBe(true);
    });

    it("should include the `--large` modifier if passed the `isLarge` prop", () => {
        const wrapper = shallow(
            <Icon iconType="test" iconName="icon" isLarge={true} />,
        );
        expect(wrapper.hasClass("a-icon--large")).toBe(true);
    });
});
