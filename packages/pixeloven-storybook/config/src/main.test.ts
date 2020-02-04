import "jest";
import * as main from "./main";

describe("@pixeloven-storybook/config", () => {
    describe("main", () => {
        it("should export storybook configuration", () => {
            expect(typeof main).toEqual("object");
            expect(typeof main.hasOwnProperty("addons")).toEqual(true);
            expect(typeof main.hasOwnProperty("stories")).toEqual(true);
            expect(typeof main.hasOwnProperty("webpackFinal")).toEqual(true);
        });
    });
});
