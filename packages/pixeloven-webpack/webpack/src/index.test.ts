import "jest";
import { getBuilder, getCompiler, getServer } from "./index";

describe("@pixeloven/webpack", () => {
    describe("index", () => {
        it("should export getBuilder", () => {
            expect(typeof getBuilder).toEqual("function");
        });
        it("should export getCompiler", () => {
            expect(typeof getCompiler).toEqual("function");
        });
        it("should export getServer", () => {
            expect(typeof getServer).toEqual("function");
        });
    });
});
