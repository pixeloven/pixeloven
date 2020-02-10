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
 * @todo https://shift.infinite.red/integration-testing-interactive-clis-93af3cc0d56f
 * @todo Can't test this since templates is not able to be mocked.
 *         - https://github.com/ductiletoaster/gluegun/blob/master/src/index.ts#L33
 *         - Alternative here would be to mock out the file system and make this closer to a true integration test
 */
describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("init", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should print info for existing projects", async () => {
                Stub.prompt.ask.resolves({
                    projectType: "Existing",
                });

                const context = await cli.run("init");
                expect(context.commandName).toEqual("init");
                expect(Stub.prompt.ask.callCount).toEqual(1);
                expect(Stub.print.info.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
        });
    });
});
