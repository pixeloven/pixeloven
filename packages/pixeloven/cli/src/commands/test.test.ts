import { Sandbox } from "../testing";
import testModule from "./test";

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("test", () => {
            afterEach(() => {
                Sandbox.reset();
            });
            afterAll(() => {
                Sandbox.restore();
            });
            it("should contains required props", () => {
                expect(testModule.name).toEqual("test");
                expect(typeof testModule.run).toEqual("function");
            });
        });
    });
});
