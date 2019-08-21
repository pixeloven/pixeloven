import { Sandbox } from "../testing";
import testModule from "./testing";

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
                expect(testModule.alias).toEqual(["--test", "-t"]);
                expect(testModule.name).toEqual("test");
                expect(typeof testModule.run).toEqual("function");
            });
        });
    });
});
