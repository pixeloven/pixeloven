import "jest";
import { env } from "./index";

describe("@pixeloven/env", () => {
    describe("index", () => {
        it("should export default as env", () => {
            expect(typeof env).toEqual("function");
        });
    });
});
