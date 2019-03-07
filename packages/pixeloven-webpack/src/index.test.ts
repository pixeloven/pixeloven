import "jest";
import { Build } from "./index";

describe("@pixeloven/webpack", () => {
    describe("index", () => {
        it("should export Compiler", () => {
            expect(typeof Build).toEqual("function");
        });
    });
});
