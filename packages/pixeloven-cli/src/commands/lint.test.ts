import { cli, Mock, Sandbox } from "../testing";
import lintModule from "./lint";

const mockPrintError = Mock.print.expects("error");
const mockPrintInfo = Mock.print.expects("info");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("lint", () => {
            afterAll(() => {
                Sandbox.restore();
                mockPrintError.restore();
                mockPrintInfo.restore();
            });
            afterEach(() => {
                Sandbox.reset();
                mockPrintError.reset();
                mockPrintInfo.reset();
            });
            it("should contains required props", () => {
                expect(lintModule.alias).toEqual(["--lint", "-l"]);
                expect(lintModule.name).toEqual("lint");
                expect(typeof lintModule.run).toEqual("function");
            });
            it("should print error", async () => {
                const context = await cli.run("lint");
                expect(mockPrintError.callCount).toEqual(1);
                expect(mockPrintInfo.callCount).toEqual(1);
                expect(context.commandName).toEqual("lint");
            });
        });
    });
});
