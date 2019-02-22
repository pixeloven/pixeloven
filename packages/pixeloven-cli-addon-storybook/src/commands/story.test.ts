import "jest";
import story from "./story";

describe("@pixeloven/cli-addon-storybook", () => {
    describe("commands", () => {
        afterAll(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });
        it("should be named", () => {
            expect(story.name).toEqual("story");
        });
    });
});
