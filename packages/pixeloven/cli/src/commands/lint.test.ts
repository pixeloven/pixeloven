import { Mock, Sandbox } from "../testing";
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
                expect(lintModule.name).toEqual("lint");
                expect(typeof lintModule.run).toEqual("function");
            });
            xit("should print error", async () => {
                // @todo need to figure out how to test errors
                // const context = await cli.run("lint");
                // expect(mockPrintError.callCount).toEqual(1);
                // expect(mockPrintInfo.callCount).toEqual(1);
                // expect(context.commandName).toEqual("lint");
            });
        });
    });
});
