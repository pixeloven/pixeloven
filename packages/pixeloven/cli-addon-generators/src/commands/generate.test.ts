import "jest";

import { build, print, prompt } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname, ".."))
    .create();

const Sandbox = sinon.createSandbox();

const Stub = {
    print: Sandbox.stub(print),
    process: {
        exit: Sandbox.stub(process, "exit"),
    },
    prompt: Sandbox.stub(prompt),
};

/**
 * @todo Can we mock the extensions for now to at least get coverage on the command logic?
 */
describe("@pixeloven/cli-addon-generators", () => {
    describe("commands", () => {
        describe("webpack", () => {
            afterEach(() => {
                Sandbox.reset();
            });
            afterAll(() => {
                Sandbox.restore();
            });
            it("should print info fo existing projects", async () => {
                Stub.prompt.ask.resolves({
                    generatorType: "App",
                });

                const context = await cli.run("generate");
                expect(context.commandName).toEqual("generate");
                expect(Stub.prompt.ask.callCount).toEqual(1);
                expect(Stub.print.info.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
        });
    });
});
