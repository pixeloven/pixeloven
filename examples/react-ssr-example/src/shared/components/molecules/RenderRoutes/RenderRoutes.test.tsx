import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import RenderRoutes from "./RenderRoutes";

configure({
    adapter: new ReactSixteenAdapter(),
});

const TestComponent = () => {
    return <div>testing</div>;
};

const routes = [
    {
        component: TestComponent,
    },
    {
        component: TestComponent,
    },
];

describe("Shared/Components/Molecules", () => {
    describe("RenderRoutes", () => {
        it("should render one <Switch /> and two <Route /> components", () => {
            const wrapper = shallow(<RenderRoutes routes={routes} />);
            expect(wrapper.find("Switch").length).toEqual(1);
            expect(wrapper.find("Route").length).toEqual(2);
        });
    });
});
