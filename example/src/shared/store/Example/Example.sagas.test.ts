import "jest";
import saga from "./Example.sagas";

describe("Shared/Store/Example", () => {
    describe("Example.sagas", () => {
        it("should export a saga", () => {
            expect(typeof saga).toEqual("function");
        });
        describe("rootSaga", () => {
            it("should return an object of sagas", () => {
                const sagas = saga();
                expect(typeof sagas).toEqual("object");
            });
        });
    });
});
