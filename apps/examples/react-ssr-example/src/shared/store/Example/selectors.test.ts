import "jest";
import { initialState } from "./reducers";
import { makeGetExampleDescription, makeGetExampleTitle } from "./selectors";

const exampleState = initialState;
exampleState.example.description = "testing";
exampleState.example.title = "testing";

describe("shared/store/Example/Example.selectors", () => {
    describe("makeGetExampleDescription", () => {
        it("should create selector that returns a description", () => {
            const getExampleDescription = makeGetExampleDescription();
            expect(getExampleDescription(exampleState)).toEqual("testing");
        });
    });
    describe("makeGetExampleTitle", () => {
        it("should create selector that returns a title", () => {
            const getExampleTitle = makeGetExampleTitle();
            expect(getExampleTitle(exampleState)).toEqual("testing");
        });
    });
});
