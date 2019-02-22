import * as macros from "@pixeloven/core";
import "jest";
import main from "./main";

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
                .mockImplementation();
            main(testArgv);
            expect(exitSpy).toHaveBeenCalledTimes(1);
        });
        it("should start cli and pass", () => {
            testArgv.push("/some/path", "yarn", "generate");
            const exitSpawnBin = jest
                .spyOn(macros, "spawnBin")
                .mockImplementation();
            const exitSpawnComplete = jest
                .spyOn(macros, "spawnComplete")
                .mockImplementation();
            main(testArgv);
            expect(exitSpawnBin).toHaveBeenCalledTimes(1);
            expect(exitSpawnComplete).toHaveBeenCalledTimes(1);

        });
    });
});
