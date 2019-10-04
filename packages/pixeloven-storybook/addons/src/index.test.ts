import "jest";
import { Actions, Backgrounds, Knobs, Viewport } from "./index";

describe("@pixeloven-storybook/addons", () => {
    describe("index", () => {
        it("should addon libraries", () => {
            expect(typeof Actions).toEqual("object");
            expect(typeof Backgrounds).toEqual("object");
            expect(typeof Knobs).toEqual("object");
            expect(typeof Viewport).toEqual("object");
        });
    });
});
