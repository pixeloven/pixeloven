import { cli, Mock, Sandbox, Stub } from "../testing";
import copyModule from "./copy";

const mockFileCopy = Mock.filesystem.expects("copy");
const mockPrintError = Mock.print.expects("error");
const mockFileExists = Mock.filesystem.expects("exists");
const mockPrintInfo = Mock.print.expects("info");
const mockPrintSuccess = Mock.print.expects("success");
const stubProcessExit = Stub.process.exit;

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("copy", () => {
            afterAll(() => {
                Sandbox.restore();
                mockFileCopy.restore();
                mockPrintError.restore();
                mockPrintInfo.restore();
                mockPrintSuccess.restore();
                mockFileExists.restore();
                stubProcessExit.restore();
            });
            afterEach(() => {
                Sandbox.reset();
                mockFileCopy.reset();
                mockPrintError.reset();
                mockPrintInfo.reset();
                mockPrintSuccess.reset();
                mockFileExists.reset();
                stubProcessExit.reset();
            });
            it("should contains required props", () => {
                expect(copyModule.name).toEqual("copy");
                expect(typeof copyModule.run).toEqual("function");
                expect(Stub.process.exit.called).toEqual(false);
            });
            it("should print error", async () => {
                const context = await cli.run("copy");
                expect(mockFileCopy.callCount).toEqual(0);
                expect(mockFileExists.callCount).toEqual(0);
                expect(mockPrintError.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should copy ico", async () => {
                const context = await cli.run("copy ico");
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy scss", async () => {
                const context = await cli.run("copy scss");
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy svg", async () => {
                const context = await cli.run("copy svg");
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy assets", async () => {
                const context = await cli.run("copy assets");
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy directory if found", async () => {
                mockFileExists.returns(true);
                const context = await cli.run("copy /path/to/some/dir");
                expect(mockFileExists.callCount).toEqual(1);
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy directory if found with source and dest", async () => {
                mockFileExists.returns(true);
                const context = await cli.run(
                    "copy /path/to/some/dir /des/path",
                );
                expect(mockFileExists.callCount).toEqual(1);
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy directory if found with source and dest and matching", async () => {
                mockFileExists.returns(true);
                const context = await cli.run(
                    "copy /path/to/some/dir /des/path **.globpattern",
                );
                expect(mockFileExists.callCount).toEqual(1);
                expect(mockFileCopy.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
        });
    });
});
