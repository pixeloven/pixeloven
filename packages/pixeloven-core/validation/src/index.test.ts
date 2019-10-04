import "jest";
import * as Validation from "./index";

describe("@pixeloven-core/validation", () => {
    describe("index", () => {
        it("should export Validation", () => {
            expect(typeof Validation).toEqual("object");
            expect(typeof Validation.isAWord).toEqual("function");
            expect(typeof Validation.minLength).toEqual("function");
        });
    });
});
