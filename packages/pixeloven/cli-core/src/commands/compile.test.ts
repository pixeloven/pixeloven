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
        describe("compile", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should exit with status code and error", async () => {
                const context = await cli.run("compile");
                expect(context.commandName).toEqual("compile");
                expect(Stub.print.error.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should successfully compile ts,tsx files without tsconfig.json", async () => {
                Stub.core.resolvePath
                    .withArgs("tsconfig.json")
                    .returns("/some/abs/path/tsconfig.json");
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("compile tsx ./some/file.ts");
                expect(context.commandName).toEqual("compile");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.calledOnce).toEqual(true);
                expect(Stub.print.warning.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should successfully compile ts,tsx files with tsconfig.json", async () => {
                Stub.core.resolvePath
                    .withArgs("tsconfig.json")
                    .returns("/some/abs/path/tsconfig.json");
                Stub.system.spawn.resolves({
                    status: 0,
                });
                const context = await cli.run("compile ts ./some/file.ts");
                expect(context.commandName).toEqual("compile");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.success.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should fail to compile ts,tsx files", async () => {
                Stub.core.resolvePath
                    .withArgs("tsconfig.json")
                    .returns("/some/abs/path/tsconfig.json");
                Stub.system.spawn.resolves({
                    status: 1,
                });
                const context = await cli.run("compile ts ./some/file.ts");
                expect(context.commandName).toEqual("compile");
                expect(Stub.system.spawn.calledOnce).toEqual(true);
                expect(Stub.print.error.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledOnce).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
        });
    });
});
