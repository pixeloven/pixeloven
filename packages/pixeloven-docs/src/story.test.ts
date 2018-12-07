import "jest";
import { Actions, Knobs } from "./story";

describe("@pixeloven/docs", () => {
    describe("story", () => {
        it("should export Actions and Knobs", () => {
            expect(typeof Actions).toEqual("object");
            expect(typeof Knobs).toEqual("object");
        });
    });
});
