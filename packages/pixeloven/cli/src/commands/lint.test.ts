import "jest";

import * as core from "@pixeloven-core/filesystem";
import { build, print, system } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname, ".."))
    .create();

const Sandbox = sinon.createSandbox();

const Mock = {
    core: Sandbox.mock(core),
};

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
        describe("lint", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should print error for missing task", async () => {
                const context = await cli.run("lint");
                expect(context.commandName).toEqual("lint");
                expect(Stub.print.error.callCount).toEqual(1);
                expect(Stub.print.info.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(3)).toEqual(true);
            });
            it("should print error for invalid task", async () => {
                const context = await cli.run("lint wrong");
                expect(context.commandName).toEqual("lint");
                expect(Stub.print.error.callCount).toEqual(1);
                expect(Stub.print.info.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should warn if tslint.json is missing and succeed linting ts/tsx", async () => {
                Mock.core.expects("resolvePath").returns(false);
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("lint ts");
                expect(context.commandName).toEqual("lint");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.calledOnce).toEqual(true);
                expect(Stub.print.warning.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should succeed linting ts/tsx with tslint.json", async () => {
                Mock.core.expects("resolvePath").returns(true);
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("lint tsx");
                expect(context.commandName).toEqual("lint");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should warn if stylelint.json is missing and succeed linting css/scss", async () => {
                Mock.core.expects("resolvePath").returns(false);
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("lint scss");
                expect(context.commandName).toEqual("lint");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.calledOnce).toEqual(true);
                expect(Stub.print.warning.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should succeed linting css/scss with stylelint.json", async () => {
                Mock.core.expects("resolvePath").returns(true);
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("lint css");
                expect(context.commandName).toEqual("lint");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
        });
    });
});
