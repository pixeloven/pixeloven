import { FileNotFoundException } from "@pixeloven/exceptions";
import fs from "fs";
import "jest";
import path from "path";
import {logger, Message} from "@pixeloven/node-logger";
import * as macros from "./macros"

let resolvePathExists = true;
const logErrorMock = (message: Message) => message;
const exitMock = (code?: number) => code;
const existsSyncMock = (somePath: string) => resolvePathExists;

const logErrorSpy = jest.spyOn(logger, "error").mockImplementation(logErrorMock);
const exitSpy = jest.spyOn(macros, "exit").mockImplementation(exitMock);
const existsSyncSpy = jest.spyOn(fs, "existsSync").mockImplementation(existsSyncMock);

/**
 * Return approx time diff
 * @description Need since sleep is not accurate to the exact milliseconds
 */
const approxTimeDiff = (start: number, end: number) => {
    return Math.round((end - start) / 10) * 10;
}

describe("@pixeloven/exceptions", () => {
    describe("macros", () => {
        afterAll(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
            resolvePathExists = true;
        });
        describe("handleError", () => {
            it("should log error and exit", () => {

                macros.handleError(new Error);
                expect(logErrorSpy).toHaveBeenCalledTimes(1);
                expect(exitSpy).toHaveBeenCalledTimes(1);
            });
        });
        describe("resolvePath", () => {
            it("should resolve path successful", () => {
                const absolutePath = macros.resolvePath("testing", false);
                expect(absolutePath).toEqual(path.resolve(process.cwd(), "testing"));
                expect(existsSyncSpy).toHaveBeenCalled();
            });
            it("should try resolve path and throw error", () => {
                resolvePathExists = false;
                const t = () => {
                    macros.resolvePath("testing");
                };
                expect(t).toThrow(FileNotFoundException);
                expect(existsSyncSpy).toHaveBeenCalled();
            });
        });
        describe("sleep", () => {
            it("should wait for approx 500 milliseconds", () => {
                const milliseconds = 500;
                const start = new Date().getTime();
                macros.sleep(milliseconds);
                const end = new Date().getTime();
                expect(approxTimeDiff(start, end)).toEqual(milliseconds);
            });
        });
    });
});
