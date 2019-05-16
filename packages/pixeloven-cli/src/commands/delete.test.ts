import { cli, Mock, Sandbox} from "../testing";
import deleteModule from "./delete";

const mockFileRemove = Mock.filesystem.expects("remove");
const mockPrintError = Mock.print.expects("error");
const mockPrintInfo = Mock.print.expects("info");
const mockPrintSuccess = Mock.print.expects("success");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("delete", () => {
            afterAll(() => {
                Sandbox.restore();
                mockFileRemove.restore();
                mockPrintError.restore();
                mockPrintInfo.restore();
                mockPrintSuccess.restore();
            });
            afterEach(() => {
                Sandbox.reset();
                mockFileRemove.reset();
                mockPrintError.reset();
                mockPrintInfo.reset();
                mockPrintSuccess.reset();
            });
            it("should contains required props", () => {
                expect(deleteModule.alias).toEqual(["--delete"]);
                expect(deleteModule.name).toEqual("delete");
                expect(typeof deleteModule.run).toEqual("function");
            });
            it("should print error", async () => {
                const context = await cli.run("delete nothing");
                expect(mockFileRemove.callCount).toEqual(0);
                expect(mockPrintError.callCount).toEqual(1);
                expect(mockPrintInfo.callCount).toEqual(1);
                expect(context.commandName).toEqual("delete");
            });
            it("should delete coverage", async () => {
                const context = await cli.run("delete coverage");
                expect(mockFileRemove.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("delete");
            });
            it("should delete dist", async () => {
                const context = await cli.run("delete dist");
                expect(mockFileRemove.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("delete");
            });
            it("should delete docs", async () => {
                const context = await cli.run("delete docs");
                expect(mockFileRemove.callCount).toEqual(1);
                expect(mockPrintSuccess.callCount).toEqual(1);
                expect(context.commandName).toEqual("delete");
            });
        });
    });
});
