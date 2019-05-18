import "jest";
import { logger } from "./index";

describe("@pixeloven/node-logger", () => {
    describe("index", () => {
        it("should export logger", () => {
            expect(typeof logger).toEqual("object");
        });
    });
});
