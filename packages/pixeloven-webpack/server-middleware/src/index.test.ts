import {
    createWebpackDevMiddleware,
    createWebpackHotServerMiddleware,
    errorHandler,
} from "./index";

describe("@pixeloven-webpack/server-middleware", () => {
    describe("index", () => {
        it("should export middleware", () => {
            expect(typeof createWebpackDevMiddleware).toEqual("function");
            expect(typeof createWebpackHotServerMiddleware).toEqual("function");
            expect(typeof errorHandler).toEqual("function");
        });
    });
});
