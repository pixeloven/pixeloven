import { cli, Sandbox } from "../testing";
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
                expect(generateModule.alias).toEqual(["--generate", "-g"]);
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
