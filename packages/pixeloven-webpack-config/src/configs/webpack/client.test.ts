import * as core from "@pixeloven/core";
import "jest";
import sinon, { SinonSandbox } from "sinon";
import client from "./client";

let sandbox: SinonSandbox;

describe("@pixeloven/webpack", () => {
    describe("configs", () => {
        describe("webpack", () => {
            describe("client", () => {
                beforeEach(() => {
                    sandbox = sinon.createSandbox();
                    sandbox
                        .stub(core, "resolvePath")
                        .call(
                            (relativePath: string, strict?: boolean) =>
                                `/test/path/${relativePath}`,
                        );
                });
                afterEach(() => {
                    sandbox.restore();
                });
                it("should export webpack config targeting web for development", () => {
                    const env = process.env;
                    env.NODE_ENV = "development";
                    const config = client(env);
                    expect(config.mode).toEqual("development");
                    expect(config.target).toEqual("web");
                });
                it("should export webpack config targeting web for production", () => {
                    const env = process.env;
                    env.NODE_ENV = "production";
                    const config = client(env);
                    expect(config.mode).toEqual("production");
                    expect(config.target).toEqual("web");
                });
            });
        });
    });
});
