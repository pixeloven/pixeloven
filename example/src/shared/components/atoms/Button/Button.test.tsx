import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Button from "./Button";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Atom Button Component", () => {
    it("should render a `button` elem by default", () => {
        const wrapper = shallow(<Button>content</Button>);
        expect(wrapper.type()).toBe("button");
    });

    it("should render an `a` elem with an `href` attr if passed an `href` prop", () => {
        const wrapper = shallow(<Button href="/test-url">content</Button>);
        expect(wrapper.type()).toBe("a");
        expect(wrapper.props().href).toBe("/test-url");
    });

    it("should extend passed classes", () => {
        const wrapper = shallow(
            <Button className="test-class">content</Button>,
        );
        expect(wrapper.hasClass("a-button")).toBe(true);
        expect(wrapper.hasClass("test-class")).toBe(true);
    });

    it("should include the `disabled` attr and `--disabled` modifier if passed the `isDisabled` prop", () => {
        const wrapper = shallow(<Button isDisabled={true}>content</Button>);
        expect(wrapper.hasClass("a-button--disabled")).toBe(true);
        expect(wrapper.props().disabled).toBe(true);
    });

    it("should not include the `--disabled` modifier if passed both the `isDisabled` and `isUnstyled` props", () => {
        const wrapper = shallow(
            <Button isDisabled={true} isUnstyled={true}>
                content
            </Button>,
        );
        expect(wrapper.hasClass("a-button--disabled")).toBe(false);
    });

    it("should include the `--full-width` modifier if passed the `isFullWidth` prop", () => {
        const wrapper = shallow(<Button isFullWidth={true}>content</Button>);
        expect(wrapper.hasClass("a-button--full-width")).toBe(true);
    });

    it("should not include the `--full-width` modifier if passed both the `isFullWidth` and `isUnstyled` props", () => {
        const wrapper = shallow(
            <Button isFullWidth={true} isUnstyled={true}>
                content
            </Button>,
        );
        expect(wrapper.hasClass("a-button--full-width")).toBe(false);
    });

    it("should include the `--hollow` modifier if passed the `isHollow` prop", () => {
        const wrapper = shallow(<Button isHollow={true}>content</Button>);
        expect(wrapper.hasClass("a-button--hollow")).toBe(true);
    });

    it("should include the `--unstyled` modifier if passed the `isUnstyled` prop", () => {
        const wrapper = shallow(<Button isUnstyled={true}>content</Button>);
        expect(wrapper.hasClass("a-button--unstyled")).toBe(true);
    });

    it("should include the `tabindex` attr if passed the `tabIndex` prop", () => {
        const wrapper = shallow(<Button tabIndex={0}>content</Button>);
        expect(wrapper.props().tabIndex).toBe(0);
    });
});
