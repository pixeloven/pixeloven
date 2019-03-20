import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import convertRouteConfig from "./convertRouteConfig";

configure({
    adapter: new ReactSixteenAdapter(),
});

const TestComponent = () => {
    return <div>testing</div>;
};

const customSimpleRoutes = [
    {
        component: TestComponent,
    },
];

const customNestedRoutes = [
    {
        component: TestComponent,
        path: (parentPath: string) => `${parentPath}/parent`,
        routes: [
            {
                component: TestComponent,
                exact: true,
                path: (parentPath: string) => `${parentPath}/child`,
                statusCode: 200,
            },
        ],
    },
];

const createSimpleConvertedRoutes = () => [
    {
        component: TestComponent,
    },
];

const createNestedConvertedRoutes = (path: string = "") => [
    {
        component: TestComponent,
        path: `${path}/parent`,
        routes: [
            {
                component: TestComponent,
                exact: true,
                path: `${path}/parent/child`,
                statusCode: 200,
            },
        ],
    },
];

describe("@pixeloven/react-router-config", () => {
    describe("Utils", () => {
        describe("convertRouteConfig", () => {
            it("should convert custom simple config without pathing", () => {
                const actual = convertRouteConfig(customSimpleRoutes);
                expect(actual).toEqual(createSimpleConvertedRoutes());
            });
            it("should convert custom nested config with custom parentPath", () => {
                const actual = convertRouteConfig(customNestedRoutes, "/root");
                expect(actual).toEqual(createNestedConvertedRoutes("/root"));
            });
            it("should convert custom nested config without custom parentPath", () => {
                const actual = convertRouteConfig(customNestedRoutes);
                expect(actual).toEqual(createNestedConvertedRoutes());
            });
            it("should convert custom nested config with string path", () => {
                const actual = convertRouteConfig([
                    {
                        component: TestComponent,
                        path: "/path"
                    },
                ]);
                expect(actual).toEqual([
                    {
                        component: TestComponent,
                        path: "/path"
                    },
                ]);
            });
        });
    });
});
