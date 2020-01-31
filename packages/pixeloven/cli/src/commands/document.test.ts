import { cli, Mock, Sandbox } from "../testing";
import documentModule from "./document";

const mockPrintError = Mock.print.expects("error");
const mockPrintInfo = Mock.print.expects("info");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("document", () => {
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
                expect(documentModule.name).toEqual("document");
                expect(typeof documentModule.run).toEqual("function");
            });
            it("should print error", async () => {
                const context = await cli.run("document");
                expect(mockPrintError.callCount).toEqual(1);
                expect(context.commandName).toEqual("document");
            });
        });
    });
});
