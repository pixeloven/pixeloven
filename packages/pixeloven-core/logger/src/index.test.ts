import "jest";
import { logger } from "./index";

describe("@pixeloven-core/logger", () => {
    describe("index", () => {
        it("should export logger", () => {
            expect(typeof logger).toEqual("object");
        });
    });
});
