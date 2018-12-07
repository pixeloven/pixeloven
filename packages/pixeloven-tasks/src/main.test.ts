import * as macros from "@pixeloven/core";
import "jest";
import main from "./main";

let testCode: number | undefined;
const exitMock = (code?: number) => {
    testCode = code;
};

const spawnNodeMock = (cmd: string) => {
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
            const exitSpy = jest.spyOn(macros, "exit").mockImplementation(exitMock);
            main(testArgv);
            expect(exitSpy).toHaveBeenCalledTimes(1);
            expect(testCode).toEqual(1);
        });
        it("should start cli \"build\" and pass", () => {
            testArgv.push("/some/path", "node", "build");
            const exitSpawnNode = jest.spyOn(macros, "spawnNode").mockImplementation(spawnNodeMock);
            const exitSpawnComplete = jest.spyOn(macros, "spawnComplete").mockImplementation(spawnCompleteMock);
            main(testArgv);
            expect(exitSpawnNode).toHaveBeenCalledTimes(1);
            expect(exitSpawnComplete).toHaveBeenCalledTimes(1);
            expect(testCode).toEqual(1);
        });
        it("should start cli \"start\" and pass", () => {
            testArgv.push("/some/path", "node", "start");
            const exitSpawnNode = jest.spyOn(macros, "spawnNode").mockImplementation(spawnNodeMock);
            const exitSpawnComplete = jest.spyOn(macros, "spawnComplete").mockImplementation(spawnCompleteMock);
            main(testArgv);
            expect(exitSpawnNode).toHaveBeenCalledTimes(1);
            expect(exitSpawnComplete).toHaveBeenCalledTimes(1);
            expect(testCode).toEqual(1);
        });
    });
});