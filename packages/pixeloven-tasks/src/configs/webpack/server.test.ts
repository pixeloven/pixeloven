import * as core from "@pixeloven/core";
import "jest";
import sinon, { SinonSandbox } from "sinon";
import server from "./server"

let sandbox: SinonSandbox;

describe("@pixeloven/tasks", () => {
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
            it("should export webpack config targeting node for development", () => {
                const env = process.env;
                env.NODE_ENV = "development";
                const config = server(env);
                expect(config.mode).toEqual("development");
                expect(config.target).toEqual("node");
            });
            it("should export webpack config targeting node for production", () => {
                const env = process.env;
                env.NODE_ENV = "production";
                const config = server(env);
                expect(config.mode).toEqual("production");
                expect(config.target).toEqual("node");
            });
        });
    });
});
