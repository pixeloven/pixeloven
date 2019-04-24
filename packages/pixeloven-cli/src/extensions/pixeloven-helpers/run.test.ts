import { system } from "gluegun";
import "jest";
import sinon from "sinon";
import run from "./run";

const sandbox = sinon.createSandbox();

const mockSpawn = sandbox.stub(system, "spawn");
const args = ["jest", "--watch"];

async function testSpawnPromise() {
    return 1;
}

describe("@pixeloven/cli", () => {
    describe("extensions/pixeloven-helpers", () => {
        describe("run", () => {
            afterEach(() => {
                sandbox.reset();
            });
            afterAll(() => {
                sandbox.restore();
            });
            it("should run cmd from list of args", () => {
                const testPromise = testSpawnPromise();
                mockSpawn
                    .withArgs("jest --watch", {
                        stdio: "inherit",
                    })
                    .returns(testSpawnPromise());
                const promise = run(args);
                expect(promise).toEqual(testPromise);
            });
        });
    });
});
