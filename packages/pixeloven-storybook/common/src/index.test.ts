import "jest";
import { Actions, Knobs, storybook, Viewport } from "./index";

describe("@pixeloven-storybook/common", () => {
    describe("index", () => {
        it("should export storybook react", () => {
            expect(typeof storybook).toEqual("function");
        });
        it("should addon libraries", () => {
            expect(typeof Actions).toEqual("object");
            expect(typeof Knobs).toEqual("object");
            expect(typeof Viewport).toEqual("object");
        });
    });
});
