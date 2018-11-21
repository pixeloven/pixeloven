import "jest";
import { Actions, Knobs } from "./index";

describe("@pixeloven/docs", () => {
    describe("index", () => {
        it("should export Actions and Knobs", () => {
            expect(typeof Actions).toEqual("object");
            expect(typeof Knobs).toEqual("object");
        });
    });
});
