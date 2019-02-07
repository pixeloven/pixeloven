import "jest";
import * as exported from "./index";

describe("@pixeloven/core", () => {
    describe("index", () => {
        it("should export macros", () => {
            expect(typeof exported.createOrEmptyDir).toEqual("function");
            expect(typeof exported.errorHandler).toEqual("function");
            expect(typeof exported.exit).toEqual("function");
            expect(typeof exported.handleError).toEqual("function");
            expect(typeof exported.normalizeUrl).toEqual("function");
            expect(typeof exported.resolvePath).toEqual("function");
            expect(typeof exported.spawnComplete).toEqual("function");
            expect(typeof exported.spawnNode).toEqual("function");
            expect(typeof exported.spawnBin).toEqual("function");
        });
    });
});