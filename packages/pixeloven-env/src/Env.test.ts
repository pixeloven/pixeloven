import "jest";
import { Env } from "./Env";

describe("@pixeloven/env", () => {
    beforeEach(() => {
        // Jest sets NODE_ENV so we need to pretend
        process.env.NODE_ENV = Env.defaultValues.NODE_ENV;
    });

    afterEach(() => {
        // Jest sets NODE_ENV so we need to set it back
        process.env.NODE_ENV = "test";
    });

    describe("Env", () => {
        describe("current", () => {
            it('should return current environment as "production"', () => {
                expect(Env.current).toEqual("production");
            });
        });
        describe("config", () => {
            it("should return entire ProcessEnv", () => {
                const value = Env.config();
                expect(value).toEqual(process.env);
            });
            it("should return variable BUILD_PATH as undefined", () => {
                const value = Env.config("BUILD_PATH");
                expect(value).toEqual(undefined);
            });
            it('should return variable BUILD_PATH as default value "woot"', () => {
                const value = Env.config("BUILD_PATH", "woot");
                expect(value).toEqual("woot");
            });
            it('should return variable BUILD_PATH as "dist" after load', () => {
                Env.load();
                const value = Env.config("BUILD_PATH");
                expect(value).toEqual("dist");
            });
        });
        describe("define", () => {
            afterEach(() => {
                process.env.BUILD_PATH = Env.defaultValues.BUILD_PATH;
            });

            it('should set variable BUILD_PATH as "woot"', () => {
                Env.define("BUILD_PATH", "woot");
                const value = Env.config("BUILD_PATH");
                expect(value).toEqual("woot");
            });
        });
        describe("load", () => {
            it("should throw error if process is undefined", () => {
                Env.process = undefined;
                expect(() => {
                    Env.load();
                }).toThrow("Node process is undefined.");
                Env.process = process;
            });
            it("should load default env", () => {
                Env.load();
                expect(process.env.BABEL_ENV).toEqual("production");
                expect(process.env.BUILD_PATH).toEqual("dist");
                expect(process.env.HOST).toEqual("localhost");
                expect(process.env.NODE_ENV).toEqual("production");
                expect(process.env.PORT).toEqual("8080");
                expect(process.env.PROTOCOL).toEqual("http");
                expect(process.env.PUBLIC_URL).toEqual("/");
            });
            it('should load default env and set environment to "development"', () => {
                Env.load("development");
                expect(process.env.BABEL_ENV).toEqual("development");
                expect(process.env.BUILD_PATH).toEqual("dist");
                expect(process.env.HOST).toEqual("localhost");
                expect(process.env.NODE_ENV).toEqual("development");
                expect(process.env.PORT).toEqual("8080");
                expect(process.env.PROTOCOL).toEqual("http");
                expect(process.env.PUBLIC_URL).toEqual("/");
            });
        });
    });
});
