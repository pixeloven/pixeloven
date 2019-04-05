import "jest";
import sinon from "sinon";
import testModule from "./test";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("test", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(testModule.alias).toEqual(["--test", "-t"]);
                expect(testModule.name).toEqual("test");
                expect(typeof testModule.run).toEqual("function");
            });
        });
    });
});
