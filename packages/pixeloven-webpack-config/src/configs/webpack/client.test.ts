import * as core from "@pixeloven/core";
import "jest";
import sinon from "sinon";
import client from "./client";

const sandbox = sinon.createSandbox();

describe("@pixeloven/webpack", () => {
    describe("configs", () => {
        describe("webpack", () => {
            describe("client", () => {
                afterAll(() => {
                    sandbox.reset();
                });
                afterEach(() => {
                    sandbox.reset();
                });
                beforeAll(() => {
                    sandbox
                        .stub(core, "resolvePath")
                        .call(
                            (relativePath: string, strict?: boolean) =>
                                `/test/path/${relativePath}`,
                            "something",
                            false,
                        );
                });
                it("should export webpack config targeting web for development", () => {
                    const env = process.env;
                    env.NODE_ENV = "development";
                    const config = client(env, {
                        outputPath: "./dist",
                        path: "/",
                        withProfiling: true,
                        withSourceMap: true,
                    });
                    expect(config.mode).toEqual("development");
                    expect(config.target).toEqual("web");
                });
                it("should export webpack config targeting web for production", () => {
                    const env = process.env;
                    env.NODE_ENV = "production";
                    const config = client(env, {
                        outputPath: "./dist",
                        path: "/",
                        withProfiling: true,
                        withSourceMap: true,
                    });
                    expect(config.mode).toEqual("production");
                    expect(config.target).toEqual("web");
                });
            });
        });
    });
});
