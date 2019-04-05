import "jest";
import sinon from "sinon";
import pixelovenModule from "./pixeloven";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("pixeloven", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(pixelovenModule.name).toEqual("pixeloven");
                expect(typeof pixelovenModule.run).toEqual("function");
            });
        });
    });
});
