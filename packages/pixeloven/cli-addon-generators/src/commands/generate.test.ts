import "jest";

/**
 * @todo This might need to be it's own module so we can use in the addons
 * @todo Need to figure out how to make this work with addons
 */
import { build, filesystem, print } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname))
    .create();

const Sandbox = sinon.createSandbox();

import generateModule from "./generate";

describe("@pixeloven/cli-addon-generators", () => {
    describe("commands", () => {
        describe("webpack", () => {
            afterEach(() => {
                Sandbox.reset();
            });
            afterAll(() => {
                Sandbox.restore();
            });
            it("should contains required props", () => {
                expect(generateModule.name).toEqual("generate");
                expect(typeof generateModule.run).toEqual("function");
            });
            xit("should throw an error without run type", async () => {
                const context = await cli.run("generate");
                expect(context.commandName).toEqual("generate");
            });
        });
    });
});
