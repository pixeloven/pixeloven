import "jest";
import ExampleActionTypes from "./Example.actions";
import reducer, { initialState } from "./Example.reducers";

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
                        payload: {
                            error: {
                                code: 1,
                                message: "bad",
                            },
                        },
                        type: ExampleActionTypes.GET_EXAMPLE_FAILURE,
                    }),
                ).toEqual("object");
            });
            it("should respond to SUCCESS action", () => {
                expect(
                    typeof reducer(initialState, {
                        payload: {
                            example: {
                                description: "woot",
                                id: 1,
                                title: "woot",
                            },
                        },
                        type: ExampleActionTypes.GET_EXAMPLE_SUCCESS,
                    }),
                ).toEqual("object");
            });
        });
    });
});
