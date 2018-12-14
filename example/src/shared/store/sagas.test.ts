import "jest";
import { rootSaga } from "./sagas";

describe("Shared/Store", () => {
    describe("sagas", () => {
        it("should export rootSaga", () => {
            expect(typeof rootSaga).toEqual("function");
        });
        describe("rootSaga", () => {
            it("should return an object of sagas", () => {
                const sagas = rootSaga();
                expect(typeof sagas).toEqual("object");
            });
        });
    });
});
