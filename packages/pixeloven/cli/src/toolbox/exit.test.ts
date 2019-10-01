import { Mock, Sandbox } from "../testing";
import exit from "./exit";

const mockPrintError = Mock.print.expects("error");
const mockPrintSuccess = Mock.print.expects("success");

describe("@pixeloven/cli", () => {
    describe("toolbox", () => {
        describe("exit", () => {
            afterAll(() => {
                Sandbox.restore();
                mockPrintError.restore();
                mockPrintSuccess.restore();
            });
            afterEach(() => {
                Sandbox.reset();
                mockPrintError.reset();
                mockPrintSuccess.reset();
            });
            it("should print error and exit with status", () => {
                // @todo Need to test
            });
            it("should print success", () => {
                exit("test", 0, "Woot!");
                expect(mockPrintError.callCount).toEqual(0);
                expect(mockPrintSuccess.callCount).toEqual(1);
            });
        });
    });
});
