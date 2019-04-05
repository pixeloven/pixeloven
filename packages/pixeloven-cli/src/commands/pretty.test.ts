import "jest";
import sinon from "sinon";
import prettyModule from "./pretty";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("pretty", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(prettyModule.alias).toEqual(["--pretty", "-p"]);
                expect(prettyModule.name).toEqual("pretty");
                expect(typeof prettyModule.run).toEqual("function");
            });
        });
    });
});
