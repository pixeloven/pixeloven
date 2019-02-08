import * as macros from "@pixeloven/core";
import "jest";
import main from "./main";

let testCode: number | undefined;
const exitMock = (code?: number) => {
    testCode = code;
};

const spawnBinMock = (cmd: string) => {
    return cmd;
};

const spawnCompleteMock = (sig: string) => {
    return sig;
};

const testArgv: string[] = [];

describe("@pixeloven/storybook", () => {
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
            testArgv.push("/some/path", "yarn", "bad");
            main(testArgv);
            expect(exitSpy).toHaveBeenCalledTimes(1);
            expect(testCode).toEqual(1);
        });
        it('should start cli "build" and pass', () => {
            testArgv.push("/some/path", "yarn", "build");
            const exitspawnBin = jest
                .spyOn(macros, "spawnBin")
                .mockImplementation(spawnBinMock);
            const exitSpawnComplete = jest
                .spyOn(macros, "spawnComplete")
                .mockImplementation(spawnCompleteMock);
            main(testArgv);
            expect(exitspawnBin).toHaveBeenCalledTimes(1);
            expect(exitSpawnComplete).toHaveBeenCalledTimes(1);
        });
        it('should start cli "start" and pass', () => {
            testArgv.push("/some/path", "yarn", "serve");
            const exitspawnBin = jest
                .spyOn(macros, "spawnBin")
                .mockImplementation(spawnBinMock);
            const exitSpawnComplete = jest
                .spyOn(macros, "spawnComplete")
                .mockImplementation(spawnCompleteMock);
            main(testArgv);
            expect(exitspawnBin).toHaveBeenCalledTimes(1);
            expect(exitSpawnComplete).toHaveBeenCalledTimes(1);
        });
    });
});
