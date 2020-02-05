import { print } from "gluegun";
import sinon from "sinon";
import main from "./main";

const Sandbox = sinon.createSandbox();

const Stub = {
    print: Sandbox.stub(print),
    process: {
        exit: Sandbox.stub(process, "exit"),
    },
};

describe("@pixeloven/cli", () => {
    describe("main", () => {
        afterAll(() => {
            Sandbox.restore();
        });
        afterEach(() => {
            Sandbox.reset();
        });
        it("should build and execute default cmd", async () => {
            const context = await main(process);
            expect(context.commandName).toEqual("pixeloven");
            expect(Stub.process.exit.calledOnce).toEqual(true);
            expect(Stub.process.exit.calledWithExactly(1)).toEqual(true);
        });
    });
});
