import "jest";
import { Level, logger, Message } from "./index";

describe("@pixeloven/node-logger", () => {
    describe("index", () => {
        it("should export logger, Level and Message", () => {
            const level: Level = "info";
            const message: Message = "test";
            expect(typeof logger).toEqual("object");
            expect(typeof level).toEqual("string");
            expect(typeof message).toEqual("string");
        });
    });
});
