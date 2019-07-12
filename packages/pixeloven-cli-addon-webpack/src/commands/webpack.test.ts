import { cli, Sandbox } from "../testing";
import webpackModule from "./webpack";

describe("@pixeloven/cli-addon-webpack", () => {
    describe("commands", () => {
        describe("webpack", () => {
            afterEach(() => {
                Sandbox.reset();
            });
            afterAll(() => {
                Sandbox.restore();
            });
            it("should contains required props", () => {
                expect(webpackModule.alias).toEqual(["--webpack", "-w"]);
                expect(webpackModule.name).toEqual("webpack");
                expect(typeof webpackModule.run).toEqual("function");
            });
            xit("should throw an error without run type", async () => {
                const context = await cli.run("webpack");
                expect(context.commandName).toEqual("webpack");
            });
        });
    });
});
