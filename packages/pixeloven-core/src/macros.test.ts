import { FileNotFoundException } from "@pixeloven/exceptions";
import { logger, Message } from "@pixeloven/node-logger";
import spawn from "cross-spawn";
import fs from "fs-extra";
import "jest";
import path from "path";
import * as macros from "./macros";

let resolvePathExists = true;
const logErrorMock = (message: Message) => message;
const exitMock = (code?: number) => code;
const existsSyncMock = (somePath: string) => resolvePathExists;
const mkdirSyncMock = (somePath: string) => undefined;
const emptyDirSyncMock = (somePath: string) => undefined;
const spawnSyncMock = (cmd: string, args: [], options: object) => "testing";

describe("@pixeloven/core", () => {
    describe("macros", () => {
        afterAll(() => {
            jest.clearAllMocks();
        });
        afterEach(() => {
            jest.restoreAllMocks();
            resolvePathExists = true;
        });
        describe("errorHandler", () => {
            it("should re-throw error", () => {
                const caller = () => {
                    macros.errorHandler(new Error("error"));
                };
                expect(caller).toThrowError();
            });
        });
        describe("handleError", () => {
            it("should log error and exit", () => {
                const logErrorSpy = jest
                    .spyOn(logger, "error")
                    .mockImplementation(logErrorMock);
                const exitSpy = jest
                    .spyOn(macros, "exit")
                    .mockImplementation(exitMock);
                const error = new Error();
                macros.handleError(error);
                expect(logErrorSpy).toHaveBeenCalledTimes(1);
                expect(exitSpy).toHaveBeenCalledTimes(1);
            });
        });
        describe("resolvePath", () => {
            it('should resolve path "strict" successfully', () => {
                resolvePathExists = true;
                const existsSyncSpy = jest
                    .spyOn(fs, "existsSync")
                    .mockImplementation(existsSyncMock);
                const absolutePath = macros.resolvePath("testing");
                expect(absolutePath).toEqual(
                    path.resolve(process.cwd(), "testing"),
                );
                expect(existsSyncSpy).toHaveBeenCalledTimes(1);
            });
            it('should resolve path NOT "strict" successfully', () => {
                const existsSyncSpy = jest
                    .spyOn(fs, "existsSync")
                    .mockImplementation(existsSyncMock);
                const absolutePath = macros.resolvePath("testing", true);
                expect(absolutePath).toEqual(
                    path.resolve(process.cwd(), "testing"),
                );
                expect(existsSyncSpy).toHaveBeenCalledTimes(1);
            });
            it('should try resolve path "strict" and throw error', () => {
                resolvePathExists = false;
                const existsSyncSpy = jest
                    .spyOn(fs, "existsSync")
                    .mockImplementation(existsSyncMock);
                const t = () => {
                    macros.resolvePath("testing");
                };
                expect(t).toThrow(FileNotFoundException);
                expect(existsSyncSpy).toHaveBeenCalledTimes(1);
            });
        });
        describe("createOrEmptyDir", () => {
            it("should make a new directory", () => {
                resolvePathExists = false;
                const existsSyncSpy = jest
                    .spyOn(fs, "existsSync")
                    .mockImplementation(existsSyncMock);
                const mkdirSyncSpy = jest
                    .spyOn(fs, "mkdirSync")
                    .mockImplementation(mkdirSyncMock);
                macros.createOrEmptyDir("tmp");
                expect(existsSyncSpy).toHaveBeenCalledTimes(1);
                expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
            });
            it("should empty an existing directory", () => {
                resolvePathExists = true;
                const existsSyncSpy = jest
                    .spyOn(fs, "existsSync")
                    .mockImplementation(existsSyncMock);
                const emptyDirSyncSpy = jest
                    .spyOn(fs, "emptyDirSync")
                    .mockImplementation(emptyDirSyncMock);
                macros.createOrEmptyDir("tmp");
                expect(existsSyncSpy).toHaveBeenCalledTimes(1);
                expect(emptyDirSyncSpy).toHaveBeenCalledTimes(1);
            });
        });
        describe("normalizeUrl", () => {
            it("should return normalized url", () => {
                const url = "https://localhost:8080//test/resource///woot";
                const expectedUrl = "https://localhost:8080/test/resource/woot";
                expect(macros.normalizeUrl(url)).toEqual(expectedUrl);
            });
        });
        describe("spawnNode", () => {
            it("should spawn a new node caller", () => {
                const spawnSyncSpy = jest
                    .spyOn(spawn, "sync")
                    .mockImplementation(spawnSyncMock);
                macros.spawnNode("script", ["arg"]);
                expect(spawnSyncSpy).toHaveBeenCalledTimes(1);
            });
        });
    });
});
