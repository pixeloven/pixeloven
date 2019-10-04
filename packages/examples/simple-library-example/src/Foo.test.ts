import "jest";
import Foo from "./Foo";

describe("@pixeloven/library-example", () => {
    describe("Foo", () => {
        it("should have property bar", () => {
            const foo = new Foo("test");
            expect(foo).toHaveProperty("bar");
            expect(foo.bar).toEqual("test");
        });
    });
});
