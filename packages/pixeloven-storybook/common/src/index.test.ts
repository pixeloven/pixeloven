import "jest";
import standalone, { Actions, Backgrounds, Knobs, Viewport } from "./index";

describe("@pixeloven-storybook/common", () => {
    describe("index", () => {
        it("should export standalone react", () => {
            expect(typeof standalone).toEqual("object");
        });
        it("should addon libraries", () => {
            expect(typeof Actions).toEqual("object");
            expect(typeof Backgrounds).toEqual("object");
            expect(typeof Knobs).toEqual("object");
            expect(typeof Viewport).toEqual("object");
        });
    });
});
