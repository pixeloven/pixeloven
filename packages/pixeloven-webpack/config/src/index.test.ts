import "jest";
import {
    webpackClientConfig,
    webpackServerConfig
} from "./index";

describe("@pixeloven-webpack/config", () => {
    describe("index", () => {
        it("should export webpackClientConfig", () => {
            expect(typeof webpackClientConfig).toEqual("function");
        });
        it("should export webpackServerConfig", () => {
            expect(typeof webpackServerConfig).toEqual("function");
        });
    });
});
