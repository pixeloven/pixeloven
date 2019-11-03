import "jest";
import reducer, { initialState } from "./reducers";
import { ExampleActionTypes } from "./types";

describe("Shared/Store/Example", () => {
    describe("Example.reducers", () => {
        it("should export a reducer", () => {
            expect(typeof reducer).toEqual("function");
        });
        describe("reducer", () => {
            it("should respond to IN_PROGRESS action", () => {
                expect(
                    typeof reducer(initialState, {
                        payload: "work",
                        type: ExampleActionTypes.GET_EXAMPLE_IN_PROGRESS,
                    }),
                ).toEqual("object");
            });
            it("should respond to FAILURE action", () => {
                expect(
                    typeof reducer(initialState, {
                        payload: "error",
                        type: ExampleActionTypes.GET_EXAMPLE_FAILURE,
                    }),
                ).toEqual("object");
            });
            it("should respond to SUCCESS action", () => {
                expect(
                    typeof reducer(initialState, {
                        payload: {
                            description: "woot",
                            title: "woot",
                        },
                        type: ExampleActionTypes.GET_EXAMPLE_SUCCESS,
                    }),
                ).toEqual("object");
            });
        });
    });
});
