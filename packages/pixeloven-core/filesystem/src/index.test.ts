import "jest";
import * as Filesystem from "./index";

describe("@pixeloven-core/filesystem", () => {
    describe("index", () => {
        it("should export filesystem", () => {
            expect(typeof Filesystem).toEqual("object");
        });
    });
});
