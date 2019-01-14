import * as macros from "@pixeloven/core";
import "jest";
import main from "./main";

let testCode: number | undefined;
const exitMock = (code?: number) => {
    testCode = code;
};

const testArgv: string[] = [];

describe("@pixeloven/webpack-dev-server", () => {
    describe("main", () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });
        afterAll(() => {
            jest.clearAllMocks();
        });
        it("should start cli and fail", () => {
            const exitSpy = jest
                .spyOn(macros, "exit")
                .mockImplementation(exitMock);
            main(testArgv);
            expect(exitSpy).toHaveBeenCalledTimes(1);
            expect(testCode).toEqual(1);
        });
        xit('should start cli "start" and pass', () => {
            // TODO also need to mock out logger
            // TODO figure out how to test everything in side try catch
        });
    });
});
