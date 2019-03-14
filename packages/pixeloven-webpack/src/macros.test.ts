import "jest";
import { getBuilder, getCompiler, getServer } from "./macros";

describe("@pixeloven/webpack", () => {
    describe("macros", () => {
        describe("getBuilder", () => {
            it("should export getBuilder", () => {
                expect(typeof getBuilder).toEqual("function");
            });
        });
        describe("getCompiler", () => {
            it("should export getBuilder", () => {
                expect(typeof getCompiler).toEqual("function");
            });
        });
        describe("getServer", () => {
            it("should export getBuilder", () => {
                expect(typeof getServer).toEqual("function");
            });
        });
    });
});
