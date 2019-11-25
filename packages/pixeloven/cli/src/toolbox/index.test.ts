import "jest";
import * as helpers from "./index";

describe("@pixeloven/cli", () => {
    describe("toolbox", () => {
        describe("index", () => {
            it("should export all helpers", () => {
                expect(helpers).toHaveProperty("getArgList");
                expect(helpers).toHaveProperty("getConfigPath");
                expect(helpers).toHaveProperty("run");
            });
        });
    });
});
