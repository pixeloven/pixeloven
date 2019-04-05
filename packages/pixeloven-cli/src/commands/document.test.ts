import "jest";
import sinon from "sinon";
import documentModule from "./document";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("document", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(documentModule.alias).toEqual(["--document"]);
                expect(documentModule.name).toEqual("document");
                expect(typeof documentModule.run).toEqual("function");
            });
        });
    });
});
