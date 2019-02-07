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

describe("@pixeloven/generators", () => {
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
        it("should start cli and pass", () => {
            testArgv.push("/some/path", "yarn", "generate");
            const exitspawnBin = jest
                .spyOn(macros, "spawnBin")
                .mockImplementation(spawnBinMock);
            const exitSpawnComplete = jest
                .spyOn(macros, "spawnComplete")
                .mockImplementation(spawnCompleteMock);
            main(testArgv);
            expect(exitspawnBin).toHaveBeenCalledTimes(1);
            expect(exitSpawnComplete).toHaveBeenCalledTimes(1);
            expect(testCode).toEqual(1);
        });
    });
});
