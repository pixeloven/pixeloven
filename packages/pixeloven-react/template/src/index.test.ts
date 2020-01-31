import "jest";
import * as obj from "./index";

describe("@pixeloven-react/template", () => {
    describe("index", () => {
        it("should export object", () => {
            expect(typeof obj).toEqual("object");
        });
    });
});
