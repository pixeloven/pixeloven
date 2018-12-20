import { configure, shallow } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import "jest";
import * as React from "react";
import Route from "./Route";

configure({
    adapter: new ReactSixteenAdapter(),
});

const TestComponent = () => {
    return <div>testing</div>;
};

describe("Shared/Components/Atoms", () => {
    describe("Route", () => {
        it("should render one <Route />", () => {
            const wrapper = shallow(<Route component={TestComponent} statusCode={200} />);
            expect(wrapper.find("Route").length).toEqual(1);
        });
    });
});
