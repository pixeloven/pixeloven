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
        describe("test", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should fail to run tests", async () => {
                Stub.system.spawn.resolves({
                    status: 1,
                });
                const context = await cli.run("test");
                expect(context.commandName).toEqual("test");
                expect(Stub.print.error.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should succeed running with jest.json", async () => {
                Mock.core
                    .expects("resolvePath")
                    .returns("/some/abs/path/jest.json");
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("test");
                expect(context.commandName).toEqual("test");
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.print.warning.calledOnce).toEqual(false);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should succeed running without jest.json by warn", async () => {
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
        });
    });
});
