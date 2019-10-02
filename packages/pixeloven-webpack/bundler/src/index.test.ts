import "jest";
import getBundler, {Build} from "./index";

describe("@pixeloven-webpack/builder", () => {
    describe("index", () => {
        it("should export Build", () => {
            expect(typeof Build).toEqual("object");
        });
        it("should export getBundler", () => {
            expect(typeof getBundler).toEqual("function");
        });
    });
});
