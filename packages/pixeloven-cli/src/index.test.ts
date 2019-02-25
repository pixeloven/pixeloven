import "jest";
import * as cli from "./main";

const caller = () => {
    require("./index");
};

describe("@pixeloven/cli", () => {
    describe("index", () => {
        afterAll(() => {
            jest.clearAllMocks();
            jest.restoreAllMocks();
        });
        it("should execute main and succeed", () => {
            const cliSpy = jest.spyOn(cli, "default");
            caller();
            expect(cliSpy).toHaveBeenCalledTimes(1);
        });
    });
});
