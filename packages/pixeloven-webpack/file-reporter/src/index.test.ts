import "jest";
import { FileReporter } from "./index";

describe("@pixeloven-webpack/bundler", () => {
    describe("index", () => {
        it("should export FileReporter", () => {
            expect(typeof FileReporter).toEqual("function");
        });
    });
});
