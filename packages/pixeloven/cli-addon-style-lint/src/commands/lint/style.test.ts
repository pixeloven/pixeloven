import "jest";

import * as core from "@pixeloven-core/filesystem";
import { build, print, system } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname, "../.."))
    .create();

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
describe("@pixeloven/cli-addon-style-lint", () => {
    describe("commands", () => {
        describe("lint style", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should warn if stylelint.json is missing and succeed linting css/scss", async () => {
                Stub.core.resolvePath
                    .withArgs("stylelint.json")
                    .returns("/some/abs/path/stylelint.json");
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("lint style");
                expect(context.commandName).toEqual("lint");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should succeed linting css/scss with stylelint.json", async () => {
                Stub.core.resolvePath
                    .withArgs("stylelint.json")
                    .returns("/some/abs/path/stylelint.json");
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("lint style");
                expect(context.commandName).toEqual("lint");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
        });
    });
});
