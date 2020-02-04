import "jest";

import storybook from "@pixeloven-storybook/common";
import { build, print } from "gluegun";
import { resolve } from "path";
import sinon from "sinon";

import storyModule from "./story";

const Sandbox = sinon.createSandbox();
const Stub = {
    common: {
        storybook: Sandbox.stub(storybook), // @todo why no work
    },
    print: Sandbox.stub(print),
    process: {
        exit: Sandbox.stub(process, "exit"),
    },
};

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
            it("should contains required props", () => {
                expect(storyModule.name).toEqual("story");
                expect(typeof storyModule.run).toEqual("function");
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
                const task = "build";
                const context = await cli.run(`story ${task}`);
                expect(context.commandName).toEqual("story");
                expect(Stub.common.storybook.called).toEqual(true);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
                done();
            });
            it("should complete start", async done => {
                const task = "start";
                const context = await cli.run(`story ${task}`);
                expect(context.commandName).toEqual("story");
                expect(Stub.common.storybook.called).toEqual(true);
                expect(Stub.process.exit.called).toEqual(true);
                expect(Stub.process.exit.calledWithExactly(0)).toEqual(true);
                done();
            });
        });
    });
});
