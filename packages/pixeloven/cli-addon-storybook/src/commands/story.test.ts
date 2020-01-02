import "jest";
import sinon from "sinon";
import storyModule from "./story";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli-addon-storybook", () => {
    describe("commands", () => {
        describe("story", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(storyModule.name).toEqual("story");
                expect(typeof storyModule.run).toEqual("function");
            });
        });
    });
});
