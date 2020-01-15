import "jest";
import { initialState } from "./Example/reducers";
import { rootReducer } from "./reducers";

describe("Shared/Store", () => {
    describe("reducers", () => {
        it("should export rootReducer", () => {
            expect(typeof rootReducer).toEqual("function");
        });
        describe("rootReducer", () => {
            it("should combine reducers", () => {
                expect(
                    typeof rootReducer(
                        {
                            example: initialState,
                        },
                        {
                            type: "TESTING",
                        },
                    ),
                ).toEqual("object");
            });
        });
    });
});
