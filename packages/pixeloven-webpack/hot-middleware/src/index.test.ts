import webpackHotMiddleware from "./index";

describe("@pixeloven-webpack/hot-middleware", () => {
    describe("index", () => {
        it("should export middleware", () => {
            expect(typeof webpackHotMiddleware).toEqual("function");
        });
    });
});
