import "jest";
import React from "react";
import { shallow } from "@pixeloven-react/testing";

import Logo from "./Logo";

describe("@src/atoms/Logo", () => {
    it("should be of type function", () => {
        expect(typeof Logo).toEqual("function");
    });
    it("should render an `img` with default 20s speed animation", () => {
        const wrapper = shallow(<Logo />);
        expect(wrapper.type()).toBe("img");
        expect(wrapper.find("img").props().src).toBe("test-file-stub");
        expect(wrapper.find("img").props().style).toEqual({
            animationDuration: "20s",
        });
    });
    it("should render an `img` with custom 30s speed animation", () => {
        const wrapper = shallow(<Logo speed={"30s"} />);
        expect(wrapper.type()).toBe("img");
        expect(wrapper.find("img").props().style).toEqual({
            animationDuration: "30s",
        });
    });
});
