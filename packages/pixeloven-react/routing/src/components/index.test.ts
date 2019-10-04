import "jest";
import { Routes, Status } from "./index";

describe("@pixeloven-react/routing", () => {
    describe("components/index", () => {
        it("should export components", () => {
            expect(typeof Routes).toEqual("function");
            expect(typeof Status).toEqual("function");
        });
    });
});
