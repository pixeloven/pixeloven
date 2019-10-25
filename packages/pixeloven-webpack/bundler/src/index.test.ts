import "jest";
import { Bundler, getBundler } from "./index";

describe("@pixeloven-webpack/bundler", () => {
    describe("index", () => {
        it("should export Build", () => {
            expect(typeof Bundler).toEqual("function");
        });
        it("should export getBundler", () => {
            expect(typeof getBundler).toEqual("function");
        });
    });
});
