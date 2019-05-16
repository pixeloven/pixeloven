import "jest";

import { build, print } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";
import helpModule from "./help";

/**
 * @todo Need to figure out how to get this working with PixelOvenContext
 */
const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname, "../"))
    .create();

const sandbox = sinon.createSandbox();
const mockPrintInfo = sandbox.mock(print).expects("info");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("help", () => {
            afterAll(() => {
                sandbox.restore();
                mockPrintInfo.restore();
            });
            afterEach(() => {
                sandbox.reset();
                mockPrintInfo.reset();
            });
            it("should contains required props", () => {
                expect(helpModule.alias).toEqual(["--help", "-h"]);
                expect(helpModule.name).toEqual("help");
                expect(typeof helpModule.run).toEqual("function");
            });
            it("should print help documentation", async () => {
                const context = await cli.run("help");
                expect(mockPrintInfo.callCount).toEqual(1);
                expect(context.commandName).toEqual("help");
            });
        });
    });
});
