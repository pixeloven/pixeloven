import { configure, mount } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import { MemoryRouter } from "react-router";
import Routes from "./Routes";

configure({
    adapter: new ReactSixteenAdapter(),
});

const TestComponent = () => {
    return <div>testing one</div>;
};

const routes = [
    {
        component: TestComponent,
        statusCode: 200,
    },
];

describe("@pixeloven/react-router-config", () => {
    describe("Components", () => {
        describe("Routes", () => {
            it("should render one <Switch /> and two <Route /> components", () => {
                const wrapper = mount(
                    <MemoryRouter>
                        <Routes config={routes} />
                    </MemoryRouter>,
                );
                const switchWrapper = wrapper.find("Switch");
                expect(switchWrapper.length).toEqual(1);
                expect(switchWrapper.find("Route").length).toEqual(1);
            });
        });
    });
});
