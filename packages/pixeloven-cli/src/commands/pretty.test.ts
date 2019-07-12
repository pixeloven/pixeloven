import { cli, Mock, Sandbox } from "../testing";
import prettyModule from "./pretty";

const mockPrintError = Mock.print.expects("error");
const mockPrintInfo = Mock.print.expects("info");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("pretty", () => {
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
                expect(prettyModule.alias).toEqual(["--pretty", "-p"]);
                expect(prettyModule.name).toEqual("pretty");
                expect(typeof prettyModule.run).toEqual("function");
            });
            it("should print error", async () => {
                const context = await cli.run("pretty");
                expect(mockPrintError.callCount).toEqual(1);
                expect(mockPrintInfo.callCount).toEqual(1);
                expect(context.commandName).toEqual("pretty");
            });
        });
    });
});
