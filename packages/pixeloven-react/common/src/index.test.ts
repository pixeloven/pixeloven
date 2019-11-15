import "jest";
import * as obj from "./index";

describe("@pixeloven-react/common", () => {
    describe("index", () => {
        it("should export object", () => {
            expect(typeof obj).toEqual("object");
        });
    });
});
