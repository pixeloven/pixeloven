import "jest";
import { Foo } from "./index";

describe("@pixeloven/library-example", () => {
    describe("index", () => {
        it("should export default as Foo", () => {
            expect(typeof Foo).toEqual("function");
        });
    });
});
