import "jest";
import { DynamicMiddleware } from "./index";

describe("@pixeloven/express-dynamic-middleware", () => {
    describe("index", () => {
        it("should export DynamicMiddleware", () => {
            expect(typeof DynamicMiddleware).toEqual("function");
        });
    });
});
