import * as core from "@pixeloven/core";
import "jest";
import sinon, { SinonSandbox } from "sinon";

let sandbox: SinonSandbox;

const caller = () => {
    return require("./server");
};

describe("@pixeloven/tasks", () => {
    describe("webpack", () => {
        describe("server", () => {
            beforeEach(() => {
                sandbox = sinon.createSandbox();
                sandbox.stub(core, "resolvePath").call((relativePath: string, strict?: boolean) => `/test/path/${relativePath}`);
            });
            afterEach(() => {
                sandbox.restore();
            });
            it("should export webpack config targeting client for development", () => {
                const config = caller();
                expect(config).toHaveProperty("default");
                expect(config.default.mode).toEqual("development");
                expect(config.default.target).toEqual("node");
            });
            /**
             * @todo pass env into server config. Make configs return functions that have the env passed in.
             */
            // it("should export webpack config targeting client for production", () => {
            //     process.env.NODE_ENV = "production";
            //     const config = caller();
            //     expect(config).toHaveProperty("default");
            //     expect(config.default.mode).toEqual("production");
            //     expect(config.default.target).toEqual("web");
            // });
        });
    });
});
