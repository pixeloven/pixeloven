import { cli, Mock, Sandbox} from "../testing";
import compileModule from "./compile";

const mockPrintError = Mock.print.expects("error");
const mockPrintInfo = Mock.print.expects("info");
const mockPrintSuccess = Mock.print.expects("success");

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("compile", () => {
            afterAll(() => {
                Sandbox.restore();
                mockPrintError.restore();
                mockPrintInfo.restore();
                mockPrintSuccess.restore();
            });
            afterEach(() => {
                Sandbox.reset();
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
                // const context = await cli.run("compile ts");
                // expect(mockPrintInfo.callCount).toEqual(1);
                // expect(context.commandName).toEqual("compile");
            });
        });
    });
});
