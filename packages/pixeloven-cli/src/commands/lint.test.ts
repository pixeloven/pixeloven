import "jest";
import sinon from "sinon";
import lintModule from "./lint";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("lint", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(lintModule.alias).toEqual(["--lint", "-l"]);
                expect(lintModule.name).toEqual("lint");
                expect(typeof lintModule.run).toEqual("function");
            });
        });
    });
});
