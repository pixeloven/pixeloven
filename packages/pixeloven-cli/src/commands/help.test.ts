import "jest";
import sinon from "sinon";
import helpModule from "./help";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("help", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(helpModule.alias).toEqual(["--help", "-h"]);
                expect(helpModule.name).toEqual("help");
                expect(typeof helpModule.run).toEqual("function");
            });
        });
    });
});
