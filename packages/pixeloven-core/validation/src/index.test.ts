import "jest";
import { Validation } from "./index";

describe("@pixeloven-core/validation", () => {
    describe("index", () => {
        it("should export Validation", () => {
            expect(typeof Validation).toEqual("object");
        });
    });
});
