import "jest";
import * as Common from "./index";

describe("@pixeloven-core/common", () => {
    describe("index", () => {
        it("should export common", () => {
            expect(typeof Common).toEqual("object");
            expect(typeof Common.mergeOptions).toEqual("function");
        });
    });
});
