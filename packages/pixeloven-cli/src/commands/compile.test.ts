import "jest";

import { build, print } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";
import compileModule from "./compile";

/**
 * @todo Need to figure out how to get this working with PixelOvenContext
 */
const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname, "../"))
    .create();

const sandbox = sinon.createSandbox();
const mockPrintError = sandbox.mock(print).expects("error");
const mockPrintInfo = sandbox.mock(print).expects("info");
const mockPrintSuccess = sandbox.mock(print).expects("success");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("compile", () => {
            afterAll(() => {
                sandbox.restore();
                mockPrintError.restore();
                mockPrintInfo.restore();
                mockPrintSuccess.restore();
            });
            afterEach(() => {
                sandbox.reset();
                mockPrintError.reset();
                mockPrintInfo.reset();
                mockPrintSuccess.reset();
            });
            it("should contains required props", () => {
                expect(compileModule.alias).toEqual(["--compile", "-c"]);
                expect(compileModule.name).toEqual("compile");
                expect(typeof compileModule.run).toEqual("function");
            });
            it("should throw an error", async () => {
                const context = await cli.run("compile");
                expect(mockPrintError.callCount).toEqual(1);
                expect(mockPrintInfo.callCount).toEqual(1);
                expect(context.commandName).toEqual("compile");
            });
            it("should compile ts,tsx files", async () => {
                // const context = await cli.run("compile");
                // expect(mockPrintInfo.callCount).toEqual(1);
                // expect(context.commandName).toEqual("compile");
            });
        });
    });
});
