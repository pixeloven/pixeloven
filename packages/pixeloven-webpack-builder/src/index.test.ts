import "jest";
import { Build } from "./index";

describe("@pixeloven/webpack-builder", () => {
    describe("index", () => {
        it("should export Build", () => {
            expect(typeof Build).toEqual("function");
        });
    });
});
