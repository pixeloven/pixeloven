import "jest";
import getCompiler, {Compiler} from "./index";

describe("@pixeloven-webpack/compiler", () => {
    describe("index", () => {
        it("should export Compiler", () => {
            expect(typeof Compiler).toEqual("object");
        });
        it("should export getCompiler", () => {
            expect(typeof getCompiler).toEqual("function");
        });
    });
});
