import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Routes from "./Routes";

configure({
    adapter: new ReactSixteenAdapter(),
});

const TestComponent = () => {
    return <div>testing</div>;
};

const routes = [
    {
        component: TestComponent,
        statusCode: 200,
    },
    {
        component: TestComponent,
        statusCode: 200,
    },
];

describe("Shared/Components/Molecules", () => {
    describe("Routes", () => {
        it("should render one <Switch /> and two <Route /> components", () => {
            const wrapper = shallow(<Routes config={routes} />);
            expect(wrapper.find("Switch").length).toEqual(1);
            expect(wrapper.find("Route").length).toEqual(2);
        });
    });
});
