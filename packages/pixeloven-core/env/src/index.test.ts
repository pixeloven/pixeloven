import "jest";
import { Env } from "./index";

describe("@pixeloven/env", () => {
    describe("index", () => {
        it("should export default as env", () => {
            expect(typeof Env).toEqual("function");
        });
    });
});
