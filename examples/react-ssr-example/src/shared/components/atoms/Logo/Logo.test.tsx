import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Logo from "./Logo";

configure({
    adapter: new ReactSixteenAdapter(),
});

describe("Atom Logo Component", () => {
    it("should render an `img` elem with an `href` attr", () => {
        const wrapper = shallow(<Logo speed={"30s"} />);
        expect(wrapper.type()).toBe("img");
        expect(wrapper.find("img").props().href).toBe(
            "/static/media/logo.svg",
        );
    });
});
