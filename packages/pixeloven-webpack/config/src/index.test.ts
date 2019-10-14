import "jest";
import {
    getConfig,
    shimOptions
} from "./index";

describe("@pixeloven-webpack/config", () => {
    describe("index", () => {
        it("should export getConfig", () => {
            expect(typeof getConfig).toEqual("function");
        });
        it("should export webpackServerConfig", () => {
            expect(typeof shimOptions).toEqual("function");
        });
    });
});
