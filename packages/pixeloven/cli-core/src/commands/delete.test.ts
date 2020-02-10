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
        describe("delete", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should print error", async () => {
                const context = await cli.run("delete");
                expect(context.commandName).toEqual("delete");
                expect(Stub.filesystem.remove.callCount).toEqual(0);
                expect(Stub.print.error.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should delete coverage", async () => {
                const context = await cli.run("delete coverage");
                expect(context.commandName).toEqual("delete");
                expect(Stub.filesystem.remove.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should delete dist", async () => {
                const context = await cli.run("delete dist");
                expect(context.commandName).toEqual("delete");
                expect(Stub.filesystem.remove.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should delete docs", async () => {
                const context = await cli.run("delete docs");
                expect(context.commandName).toEqual("delete");
                expect(Stub.filesystem.remove.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should delete stats", async () => {
                const context = await cli.run("delete stats");
                expect(context.commandName).toEqual("delete");
                expect(Stub.filesystem.remove.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
            it("should delete stories", async () => {
                const context = await cli.run("delete stories");
                expect(context.commandName).toEqual("delete");
                expect(Stub.filesystem.remove.callCount).toEqual(1);
                expect(Stub.print.success.callCount).toEqual(1);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
            });
        });
    });
});
