import { cli, Mock, Sandbox } from "../testing";
import copyModule from "./copy";

const mockFileCopy = Mock.filesystem.expects("copy");
const mockPrintError = Mock.print.expects("error");
const mockPrintInfo = Mock.print.expects("info");
const mockPrintSuccess = Mock.print.expects("success");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("copy", () => {
            afterAll(() => {
                Sandbox.restore();
                mockFileCopy.restore();
                mockPrintError.restore();
                mockPrintInfo.restore();
                mockPrintSuccess.restore();
            });
            afterEach(() => {
                Sandbox.reset();
                mockFileCopy.reset();
                mockPrintError.reset();
                mockPrintInfo.reset();
                mockPrintSuccess.reset();
            });
            it("should contains required props", () => {
                expect(copyModule.name).toEqual("copy");
                expect(typeof copyModule.run).toEqual("function");
            });
            it("should print error", async () => {
                const context = await cli.run("copy");
                expect(mockFileCopy.callCount).toEqual(0);
                expect(mockPrintError.callCount).toEqual(1);
                expect(mockPrintInfo.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
            });
            it("should copy ico", async () => {
                const context = await cli.run("copy ico");
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
            });
            it("should copy scss", async () => {
                const context = await cli.run("copy scss");
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
            });
            it("should copy svg", async () => {
                const context = await cli.run("copy svg");
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
            });
            it("should copy assets", async () => {
                const context = await cli.run("copy assets");
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
            });
        });
    });
});
