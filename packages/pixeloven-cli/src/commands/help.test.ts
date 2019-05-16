import { cli, Mock, Sandbox } from "../testing";
import helpModule from "./help";

const mockPrintInfo = Mock.print.expects("info");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("help", () => {
            afterAll(() => {
                Sandbox.restore();
                mockPrintInfo.restore();
            });
            afterEach(() => {
                Sandbox.reset();
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
