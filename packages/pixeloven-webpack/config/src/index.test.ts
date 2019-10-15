import "jest";
import { getConfig } from "./index";

describe("@pixeloven-webpack/config", () => {
    describe("index", () => {
        it("should export getConfig", () => {
            expect(typeof getConfig).toEqual("function");
        });
    });
});
