import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import { MainMenu, MenuItem } from "../";

configure({
    adapter: new ReactSixteenAdapter(),
});

const items: MenuItem[] = [
    { name: "Home", path: "/", active: false },
    { name: "About", path: "/about/", active: false },
    { name: "Blog", path: "/blog/", active: false },
];

describe("Components", () => {
    describe("Organisms", () => {
        describe("MainMenu", () => {
            it("should render <MenuItemArray>", () => {
                const wrapper = shallow(<MainMenu items={items} />);
                expect(wrapper.find("MenuItemArray")).toHaveLength(1);
            });
            it("should have 'a' in defaultProps", () => {
                expect(MainMenu.defaultProps.as).toEqual("a");
            });
            it("should be fixed to top", () => {
                const wrapper = shallow(
                    <MainMenu items={items} fixed={true} />,
                );
                expect(wrapper.find({ fixed: "top" }).length).toBe(1);
            });
        });
    });
});
