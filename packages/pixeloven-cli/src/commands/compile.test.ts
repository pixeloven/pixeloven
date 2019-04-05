import "jest";
import sinon from "sinon";
import compileModule from "./compile";

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
                expect(compileModule.alias).toEqual(["--compile", "-c"]);
                expect(compileModule.name).toEqual("compile");
                expect(typeof compileModule.run).toEqual("function");
            });
        });
    });
});
