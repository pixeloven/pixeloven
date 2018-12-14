import { configure } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import matchRoutes from "./matchRoutes";

configure({
    adapter: new ReactSixteenAdapter(),
});

const TestComponent = () => {
    return <div>testing</div>;
};

const routes = [
    {
        component: TestComponent,
        path: "/testing",
        routes: [
            {
                component: TestComponent,
                path: "/testing/foo",
            },
            {
                component: TestComponent,
                path: "/testing/bar",
            },
        ],
    },
];

describe("Shared/Router", () => {
    describe("matchRoutes", () => {
        it("should match just the parent route", () => {
            const matched = matchRoutes(routes, "/testing");
            expect(matched.length).toEqual(1);
            expect(matched[0].route.path).toEqual("/testing");
        });
        it("should match one child and it's parent", () => {
            const matched = matchRoutes(routes, "/testing/bar");
            expect(matched.length).toEqual(2);
            expect(matched[0].route.path).toEqual("/testing");
            expect(matched[1].route.path).toEqual("/testing/bar");
        });
    });
});
