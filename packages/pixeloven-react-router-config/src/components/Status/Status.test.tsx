import { configure, mount } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Status from "./Status";

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

describe("@pixeloven/react-router-config", () => {
    describe("Components", () => {
        describe("Status", () => {
            it("should render one <TestComponent /> and not set status code without `statusCode` or `staticContext` props", () => {
                const wrapper = mount(
                    <Status>
                        <TestComponent />
                    </Status>,
                );
                expect(wrapper.find("TestComponent").length).toEqual(1);
                expect(componentProps.staticContext.statusCode).toEqual(200);
            });
            it("should render one <TestComponent /> and not set status code without `statusCode` prop", () => {
                const wrapper = mount(
                    <Status staticContext={componentProps.staticContext}>
                        <TestComponent />
                    </Status>,
                );
                expect(wrapper.find("TestComponent").length).toEqual(1);
                expect(componentProps.staticContext.statusCode).toEqual(200);
            });
            it("should render one <TestComponent /> and status code", () => {
                const wrapper = mount(
                    <Status
                        statusCode={404}
                        staticContext={componentProps.staticContext}
                    >
                        <TestComponent />
                    </Status>,
                );
                expect(wrapper.find("TestComponent").length).toEqual(1);
                expect(componentProps.staticContext.statusCode).toEqual(404);
            });
        });
    });
});
