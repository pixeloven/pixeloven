import "jest";
import { Compiler } from "./index";

describe("@pixeloven/webpack-compiler", () => {
    describe("index", () => {
        it("should export Compiler", () => {
            expect(typeof Compiler).toEqual("function");
        });
    });
});
