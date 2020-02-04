import "jest";
import storybook, { Actions, Backgrounds, Knobs, Viewport } from "./index";

describe("@pixeloven-storybook/common", () => {
    describe("index", () => {
        it("should export storybook react", () => {
            expect(typeof storybook).toEqual("object");
        });
        it("should addon libraries", () => {
            expect(typeof Actions).toEqual("object");
            expect(typeof Backgrounds).toEqual("object");
            expect(typeof Knobs).toEqual("object");
            expect(typeof Viewport).toEqual("object");
        });
    });
});
