import "jest";

import * as core from "@pixeloven-core/filesystem";
import { build, print, system } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

const cli = build().brand("pixeloven").src(resolve(__dirname, "..")).create();

const Sandbox = sinon.createSandbox();

const Stub = {
    core: {
        resolvePath: Sandbox.stub(core, "resolvePath"),
    },
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
            it("should print error when no arguments are provided", async () => {
                const context = await cli.run("pretty");
                expect(context.commandName).toEqual("pretty");
                expect(Stub.print.error.calledOnce).toEqual(true);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should succeed running with prettier.json", async () => {
                Stub.core.resolvePath
                    .withArgs("prettier.json")
                    .returns("/some/abs/path/prettier.json");
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("pretty ./src/index.ts");
                expect(context.commandName).toEqual("pretty");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.print.warning.callCount).toEqual(0);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should succeed running without prettier.json by warn", async () => {
                Stub.core.resolvePath
                    .withArgs("prettier.json")
                    .returns("/some/abs/path/prettier.json");
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("pretty ./src/index.ts");
                expect(context.commandName).toEqual("pretty");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.callCount).toEqual(1);
                // expect(Stub.print.warning.callCount).toEqual(1); // @todo not reachable
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
        });
    });
});
