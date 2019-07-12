import { Sandbox } from "../testing";
import pixelovenModule from "./pixeloven";

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("pixeloven", () => {
            afterEach(() => {
                Sandbox.reset();
            });
            afterAll(() => {
                Sandbox.restore();
            });
            it("should contains required props", () => {
                expect(pixelovenModule.name).toEqual("pixeloven");
                expect(typeof pixelovenModule.run).toEqual("function");
            });
        });
    });
});
