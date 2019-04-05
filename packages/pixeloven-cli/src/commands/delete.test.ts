import "jest";
import sinon from "sinon";
import deleteModule from "./compile";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("compile", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(deleteModule.alias).toEqual(["--compile", "-c"]);
                expect(deleteModule.name).toEqual("compile");
                expect(typeof deleteModule.run).toEqual("function");
            });
        });
    });
});
