import "jest";

import { build, filesystem, print } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname, ".."))
    .create();

const Sandbox = sinon.createSandbox();

const Stub = {
    filesystem: Sandbox.stub(filesystem),
    print: Sandbox.stub(print),
    process: {
        exit: Sandbox.stub(process, "exit"),
    },
};

describe("@pixeloven/cli", () => {
    describe("commands", () => {
        describe("copy", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should print error", async () => {
                const context = await cli.run("copy");
                expect(context.commandName).toEqual("copy");

                expect(Stub.filesystem.copy.callCount).toEqual(0);
                expect(Stub.filesystem.exists.callCount).toEqual(0);
                expect(Stub.print.error.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should copy ico", async () => {
                const context = await cli.run("copy ico");
                expect(context.commandName).toEqual("copy");
                expect(Stub.filesystem.copy.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy scss", async () => {
                const context = await cli.run("copy scss");
                expect(Stub.filesystem.copy.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy svg", async () => {
                const context = await cli.run("copy svg");
                expect(Stub.filesystem.copy.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy assets", async () => {
                const context = await cli.run("copy assets");
                expect(Stub.filesystem.copy.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy directory if found", async () => {
                // @ts-ignore
                Stub.filesystem.exists.returns(true);
                const context = await cli.run("copy /path/to/some/dir");
                expect(Stub.filesystem.exists.callCount).toEqual(1);
                expect(Stub.filesystem.copy.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy directory if found with source and dest", async () => {
                // @ts-ignore
                Stub.filesystem.exists.returns(true);
                const context = await cli.run(
                    "copy /path/to/some/dir /des/path",
                );
                expect(Stub.filesystem.exists.callCount).toEqual(1);
                expect(Stub.filesystem.copy.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should copy directory if found with source and dest and matching", async () => {
                // @ts-ignore
                Stub.filesystem.exists.returns(true);
                const context = await cli.run(
                    "copy /path/to/some/dir /des/path **.globpattern",
                );
                expect(Stub.filesystem.exists.callCount).toEqual(1);
                expect(Stub.filesystem.copy.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(context.commandName).toEqual("copy");
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
        });
    });
});
