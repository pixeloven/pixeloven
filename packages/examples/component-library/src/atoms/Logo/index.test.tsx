import "jest";
import * as Test from "./index";

describe("@examples/component-library/atoms/index", () => {
    it("should export Logo", () => {
        expect(typeof Test).toEqual("object");
        expect(Test).toHaveProperty("Logo");
    });
});
