import "jest";
import * as obj from "./index";

describe("@pixeloven-react/testing", () => {
    describe("index", () => {
        it("should export object", () => {
            expect(typeof obj).toEqual("object");
        });
    });
});
