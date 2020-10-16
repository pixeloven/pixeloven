import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { ErrorBoundary } from "./index";

const GoodTestComponent = () => {
    return <div>testing</div>;
};

configure({
    adapter: new ReactSixteenAdapter(),
});

console.error = jest.fn();

describe("apps/checkout/organisms/ErrorBoundry", () => {
    it("should render <GoodTestComponent /> without errors", () => {
        const onCatch = jest.fn();
        const render = () => {
            return shallow(
                <MemoryRouter>
                    <ErrorBoundary onCatch={onCatch}>
                        <GoodTestComponent />
                    </ErrorBoundary>
                </MemoryRouter>,
            );
        };
        const wrapper = render();
        expect(wrapper.find("GoodTestComponent").length).toEqual(1);
        expect(onCatch.mock.calls.length).toEqual(0);
    });
});
