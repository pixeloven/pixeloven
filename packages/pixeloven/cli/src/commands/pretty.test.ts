import "jest";

// import * as core from "@pixeloven-core/filesystem";
import { build, print, system } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname, ".."))
    .create();

const Sandbox = sinon.createSandbox();

// const Mock = {
//     core: Sandbox.mock(core),
// };

const Stub = {
    print: Sandbox.stub(print),
    process: {
        exit: Sandbox.stub(process, "exit"),
    },
    system: Sandbox.stub(system),
};

/**
 * @todo Find a way to mock the filesystem
 *      - These tests rely on mocking too much
 *      - Docker might help here
 */
describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("pretty", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should print error for missing task", async () => {
                const context = await cli.run("pretty");
                expect(context.commandName).toEqual("pretty");
                expect(Stub.print.error.callCount).toEqual(1);
                expect(Stub.print.info.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should print error for invalid task", async () => {
                const context = await cli.run("pretty wrong");
                expect(context.commandName).toEqual("pretty");
                expect(Stub.print.error.callCount).toEqual(1);
                expect(Stub.print.info.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
        });
    });
});
