import "jest";
import { Validation } from "./index";

describe("@pixeloven/generators", () => {
    describe("index", () => {
        it("should export Validation", () => {
            expect(typeof Validation).toEqual("object");
        });
    });
});
