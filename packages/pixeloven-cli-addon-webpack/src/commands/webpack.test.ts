import "jest";
import webpack from "./webpack";

describe("@pixeloven/cli-addon-webpack", () => {
    describe("commands", () => {
        afterAll(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });
        it("should be named", () => {
            expect(webpack.name).toEqual("webpack");
        });
    });
});
