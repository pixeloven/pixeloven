import sinon from "sinon";
import * as main from "./main";

const Sandbox = sinon.createSandbox();
const caller = () => {
    require("./index");
};

describe("@pixeloven/cli", () => {
    describe("index", () => {
        afterAll(() => {
            Sandbox.restore();
        });
        afterEach(() => {
            Sandbox.reset();
        });
        it("should execute main", () => {
            const mockMain = Sandbox.mock(main).expects("default");
            caller();
            expect(mockMain.callCount).toEqual(1);
        });
    });
});
