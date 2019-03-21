import "jest";
import {
    Routes,
    Status,
} from "./index";

describe("@pixeloven/react-router-config", () => {
    describe("components/index", () => {
        it("should export components", () => {
            expect(typeof Routes).toEqual("function");
            expect(typeof Status).toEqual("function");
        });
    });
});
