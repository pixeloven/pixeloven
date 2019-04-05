import "jest";
import * as helpers from "./index";

describe("@pixeloven/cli", () => {
    describe("extensions/pixeloven-helpers", () => {
        describe("index", () => {
            it("should export all helpers", () => {
                expect(helpers).toHaveProperty("getArgList");
                expect(helpers).toHaveProperty("getConfigPath");
                expect(helpers).toHaveProperty("resolvePlugin");
                expect(helpers).toHaveProperty("run");
            });
        });
    });
});
