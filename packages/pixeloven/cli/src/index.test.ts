import { Sandbox } from "./testing";

import * as main from "./main";

const mockMain = Sandbox.mock(main).expects("default");

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
            caller();
            expect(mockMain.callCount).toEqual(1);
        });
    });
});
