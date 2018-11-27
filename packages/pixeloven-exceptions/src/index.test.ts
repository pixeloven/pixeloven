import "jest";
import { Exception, FileNotFoundException, NodeProcessException } from "./index";

describe("@pixeloven/exceptions", () => {
    describe("index", () => {
        it("should export Exception", () => {
            expect(typeof Exception).toEqual("function");
        });
        it("should export FileNotFoundException", () => {
            expect(typeof FileNotFoundException).toEqual("function");
        });
        it("should export NodeProcessException", () => {
            expect(typeof NodeProcessException).toEqual("function");
        });
    });
});
