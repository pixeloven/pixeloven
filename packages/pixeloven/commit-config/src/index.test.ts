import "jest";

describe("@pixeloven/commitlint-conventional-config", () => {
    describe("index", () => {
        it("should contains required props", () => {
            const config = require("./index");
            expect(config).toHaveProperty("rules");
            expect(typeof config.rules).toEqual("object");
        });
    });
});
