import { configure, mount } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import { MemoryRouter } from "react-router";
import Route from "./Route";

configure({
    adapter: new ReactSixteenAdapter(),
});

const componentProps = {
    staticContext: {
        statusCode: 200,
    },
};

const TestComponent = () => {
    return <div>testing</div>;
};

describe("Shared/Components/Atoms", () => {
    describe("Route", () => {
        it("should render one <TestComponent />", () => {
            const wrapper = mount(
                <MemoryRouter>
                    <Route
                        component={TestComponent}
                        statusCode={200}
                        {...componentProps}
                    />
                </MemoryRouter>,
            );
            expect(wrapper.find("TestComponent").length).toEqual(1);
        });
    });
});
