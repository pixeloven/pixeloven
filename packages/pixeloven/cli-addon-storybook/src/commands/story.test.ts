import "jest";

import * as common from "@pixeloven-storybook/common";
import { build, print } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

const Sandbox = sinon.createSandbox();
const Stub = {
    common: {
        storybook: Sandbox.stub(common, "storybook"),
    },
    print: Sandbox.stub(print),
    process: {
        exit: Sandbox.stub(process, "exit"),
    },
};

// import storyModule from "./story";

const cli = build()
    .brand("pixeloven")
    .src(resolve(__dirname, ".."))
    .create();

describe("@pixeloven/cli-addon-storybook", () => {
    describe("commands", () => {
        describe("story", () => {
            afterAll(() => {
                Sandbox.restore();
            });
            afterEach(() => {
                Sandbox.reset();
            });
            it("should exit with an error when no task is provided", async () => {
                const context = await cli.run("story");
                expect(context.commandName).toEqual("story");
                expect(Stub.print.error.called).toEqual(true);
                expect(
                    Stub.print.error.calledWithExactly(
                        "Invalid argument no task provided.",
                    ),
                ).toEqual(true);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should exit with an error when an invalid task is provided", async () => {
                const task = "wrong";
                const context = await cli.run(`story ${task}`);
                expect(context.commandName).toEqual("story");
                expect(Stub.print.error.called).toEqual(true);
                expect(
                    Stub.print.error.calledWithExactly(
                        `Invalid argument ${task}`,
                    ),
                ).toEqual(true);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should exit with an error when a single invalid option is provided", async () => {
                const task = "build";
                const context = await cli.run(`story ${task} --wrong`);
                expect(context.commandName).toEqual("story");
                expect(Stub.print.error.called).toEqual(true);
                expect(
                    Stub.print.error.calledWithExactly(
                        `Invalid ${task} option --wrong`,
                    ),
                ).toEqual(true);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should exit with an error when multiple invalid options are provided", async () => {
                const task = "build";
                const context = await cli.run(`story ${task} --wrong --bad`);
                expect(context.commandName).toEqual("story");
                expect(Stub.print.error.called).toEqual(true);
                expect(
                    Stub.print.error.calledWithExactly(
                        `Invalid ${task} options --wrong --bad`,
                    ),
                ).toEqual(true);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
            });
            it("should complete build", async done => {
                Stub.common.storybook.resolves();

                const task = "build";
                const context = await cli.run(`story ${task}`);
                expect(context.commandName).toEqual("story");
                expect(Stub.common.storybook.called).toEqual(true);
                expect(Stub.process.exit.called).toEqual(false);
                done();
            });
            it("should complete start", async done => {
                Stub.common.storybook.resolves();

                const task = "start";
                const context = await cli.run(`story ${task}`);
                expect(context.commandName).toEqual("story");
                expect(Stub.common.storybook.called).toEqual(true);
                expect(Stub.process.exit.called).toEqual(false);
                done();
            });
            it("should exit when storybook fails", async done => {
                Stub.common.storybook.throwsException("testing");

                const task = "build";
                const context = await cli.run(`story ${task}`);
                expect(context.commandName).toEqual("story");
                expect(Stub.common.storybook.called).toEqual(true);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
                done();
            });
        });
    });
});
