import "jest";
import { Router, Routes, Status } from "./index";

describe("@pixeloven-react/routing", () => {
    describe("index", () => {
        it("should export components and utils", () => {
            expect(typeof Routes).toEqual("function");
            expect(typeof Status).toEqual("function");
            expect(typeof Router).toEqual("object");
        });
    });
});
