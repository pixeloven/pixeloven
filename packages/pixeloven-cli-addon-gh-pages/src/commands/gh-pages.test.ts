import "jest";
import ghPages from "./gh-pages";

describe("@pixeloven/cli-addon-storybook", () => {
    describe("commands", () => {
        afterAll(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });
        it("should be named", () => {
            expect(ghPages.name).toEqual("gh-pages");
        });
    });
});
