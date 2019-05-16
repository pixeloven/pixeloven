import { Mock, Sandbox } from "../testing";
import invalidArgument from "./invalid-arg";

const mockPrintError = Mock.print.expects("error");
const mockPrintInfo = Mock.print.expects("info");

describe("@pixeloven/cli", () => {
    describe("toolbox", () => {
        describe("invalidArgument", () => {
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
            it("should print error and info", () => {
                invalidArgument();
                expect(mockPrintError.callCount).toEqual(1);
                expect(mockPrintInfo.callCount).toEqual(1);
            });
        });
    });
});
