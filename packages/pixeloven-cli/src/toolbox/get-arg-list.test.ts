import "jest";
import getArgList from "./get-arg-list";

const array = ["watch"];
const options = {
    coverage: true,
};
const raw = ["/path/to/node", "/path/to/cli", "test", "watch", "--coverage"];

describe("@pixeloven/cli", () => {
    describe("extensions/pixeloven-helpers", () => {
        describe("get-arg-list", () => {
            afterAll(() => {
                jest.clearAllMocks();
                jest.restoreAllMocks();
            });
            it("should return empty list", () => {
                const argList = getArgList("test", {
                    options: {},
                });
                expect(argList.length).toEqual(0);
                expect(argList).toEqual([]);
            });
            it("should return args list", () => {
                const argList = getArgList("test", {
                    array,
                    options,
                    raw,
                });
                expect(argList.length).toEqual(1);
                expect(argList).toEqual(["watch"]);
            });
            it("should return args list and ignore first arg", () => {
                const argList = getArgList(
                    "test",
                    {
                        array,
                        options,
                        raw,
                    },
                    {
                        offset: 1,
                        type: "default",
                    },
                );
                expect(argList.length).toEqual(1);
                expect(argList).toEqual(["watch"]);
            });
            it("should return args list with raw options included", () => {
                const argList = getArgList(
                    "test",
                    {
                        array,
                        options,
                        raw,
                    },
                    {
                        offset: 0,
                        type: "withOptions",
                    },
                );
                expect(argList.length).toEqual(3);
                expect(argList).toEqual(["test", "watch", "--coverage"]);
            });
        });
    });
});
