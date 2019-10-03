import "jest";
import { Logo } from "./index";

describe("@pixeloven/component-library-example", () => {
    describe("index", () => {
        it("should export default as Logo", () => {
            expect(typeof Logo).toEqual("function");
        });
    });
});
