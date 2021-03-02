import "jest";
import * as Test from "./index";

describe("@src/atoms/index", () => {
    it("should export Logo", () => {
        expect(typeof Test).toEqual("object");
        expect(Test).toHaveProperty("Logo");
    });
});
