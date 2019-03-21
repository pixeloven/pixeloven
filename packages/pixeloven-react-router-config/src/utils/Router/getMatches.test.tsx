import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import getMatches from "./getMatches";

configure({
    adapter: new ReactSixteenAdapter(),
});

const TestComponent = () => {
    return <div>testing</div>;
};

const basicRouteConfig = [
    {
        component: TestComponent,
    },
];

const basicRouteConfigWithChild = [
    {
        component: TestComponent,
        routes: [
            {
                component: TestComponent,
            },
        ],
    },
];

const pathRouteConfigWithChildren = [
    {
        component: TestComponent,
        path: "/switch",
        routes: [
            {
                component: TestComponent,
                path: "/switch/partial",
            },
            {
                component: TestComponent,
                path: "/switch/partial",
            },
        ],
    },
    {
        component: TestComponent,
        path: "/testing",
        routes: [
            {
                component: TestComponent,
                exact: true,
                path: "/testing/foo",
                statusCode: 200,
            },
            {
                component: TestComponent,
                exact: true,
                path: "/testing/bar",
                statusCode: 200,
            },
        ],
    },
];

describe("@pixeloven/react-router-config", () => {
    describe("utils/Router", () => {
        describe("matchRoutes", () => {
            it("should match to root path", () => {
                const matched = getMatches(basicRouteConfig);
                expect(matched.length).toEqual(1);
            });
            it("should match no routes", () => {
                const matched = getMatches(pathRouteConfigWithChildren, {
                    path: "/missing",
                });
                expect(matched.length).toEqual(0);
            });
            it("should match parent and child to root path", () => {
                const matched = getMatches(basicRouteConfigWithChild, {
                    path: "/",
                });
                expect(matched.length).toEqual(2);
            });
            it("should match the parent route", () => {
                const matched = getMatches(pathRouteConfigWithChildren, {
                    path: "/testing",
                });
                expect(matched.length).toEqual(1);
                expect(matched[0].route.path).toEqual("/testing");
            });
            it("should match the parent route and one child", () => {
                const matched = getMatches(pathRouteConfigWithChildren, {
                    path: "/testing/bar",
                });
                expect(matched.length).toEqual(2);
                expect(matched[0].route.path).toEqual("/testing");
                expect(matched[1].route.path).toEqual("/testing/bar");
            });
            it("should match the parent route and two children", () => {
                const matched = getMatches(pathRouteConfigWithChildren, {
                    as: "default",
                    path: "/switch/partial",
                });
                expect(matched.length).toEqual(3);
                expect(matched[0].route.path).toEqual("/switch");
                expect(matched[1].route.path).toEqual("/switch/partial");
                expect(matched[2].route.path).toEqual("/switch/partial");
            });
            it("should match the parent route and one child with switch style behavior", () => {
                const matched = getMatches(pathRouteConfigWithChildren, {
                    as: "switch",
                    path: "/switch/partial",
                });
                expect(matched.length).toEqual(2);
                expect(matched[0].route.path).toEqual("/switch");
                expect(matched[1].route.path).toEqual("/switch/partial");
            });
        });
    });
});
