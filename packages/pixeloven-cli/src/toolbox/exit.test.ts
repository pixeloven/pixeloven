import { Mock, Sandbox} from "../testing";

describe("@pixeloven/cli", () => {
    describe("toolbox", () => {
        describe("run", () => {
            afterEach(() => {
                Sandbox.reset();
            });
            afterAll(() => {
                Sandbox.restore();
            });
            it("should print error and exit with status", () => {
                //
            });
            it("should print success", () => {
                //
            });
        });
    });
});
