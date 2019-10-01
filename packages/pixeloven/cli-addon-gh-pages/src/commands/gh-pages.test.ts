import "jest";
import sinon from "sinon";
import ghPagesModule from "./gh-pages";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli-addon-gh-pages", () => {
    describe("commands", () => {
        describe("gh-pages", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(ghPagesModule.name).toEqual("gh-pages");
                expect(typeof ghPagesModule.run).toEqual("function");
            });
        });
    });
});
