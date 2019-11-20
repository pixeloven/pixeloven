import "jest";
import loader from "./index";

describe("@pixeloven-webpack/ts-loader", () => {
    describe("index", () => {
        it("should export array of loaders", () => {
            expect(typeof loader).toEqual("object");
            expect(Array.isArray(loader)).toEqual(true);
        });
    });
});
