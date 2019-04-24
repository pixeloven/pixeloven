import "jest";
import config from "./index";

describe("@pixeloven/commitlint-conventional-config", () => {
    describe("index", () => {
        it("should contains required props", () => {
            expect(config).toHaveProperty("rules");
            expect(typeof config.rules).toEqual("object");
        });
    });
});
