import "jest";
import * as exported from "./index";

describe("@pixeloven-core/macros", () => {
    describe("index", () => {
        it("should export macros", () => {
            expect(typeof exported.createOrEmptyDir).toEqual("function");
            expect(typeof exported.exit).toEqual("function");
            expect(typeof exported.normalizeUrl).toEqual("function");
            expect(typeof exported.resolvePath).toEqual("function");
        });
    });
});

/**
 * @TODO MOVE THESE TO NEW LIBRARIES
 */