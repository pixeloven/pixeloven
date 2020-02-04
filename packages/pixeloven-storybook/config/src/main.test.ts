import "jest";
import * as main from "./main";

describe("@pixeloven-storybook/config", () => {
    describe("main", () => {
        it("should export storybook configuration", () => {
            expect(typeof main).toEqual("object");
            expect(main.hasOwnProperty("addons")).toEqual(true);
            expect(main.hasOwnProperty("stories")).toEqual(true);
            expect(main.hasOwnProperty("webpackFinal")).toEqual(true);
        });
    });
});
