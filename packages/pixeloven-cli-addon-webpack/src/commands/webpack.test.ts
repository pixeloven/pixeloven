import "jest";
import sinon from "sinon";
import webpackModule from "./webpack";

const sandbox = sinon.createSandbox();

describe("@pixeloven/cli-addon-webpack", () => {
    describe("commands", () => {
        describe("webpack", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should contains required props", () => {
                expect(webpackModule.alias).toEqual(["--webpack", "-w"]);
                expect(webpackModule.name).toEqual("webpack");
                expect(typeof webpackModule.run).toEqual("function");
            });
        });
    });
});
