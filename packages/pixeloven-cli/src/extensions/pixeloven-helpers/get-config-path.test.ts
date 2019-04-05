import { filesystem, print } from "gluegun";
import "jest";
import getConfigPath from "./get-config-path";

const mockPrint = jest.fn();
const mockExists = jest.fn();
const mockPath = jest.fn();

describe("@pixeloven/cli", () => {
    describe("extensions/pixeloven-helpers", () => {
        describe("get-config-path", () => {
            beforeEach(() => {
                filesystem.exists = mockExists;
                filesystem.path = mockPath;
                print.warning = mockPrint;
            });
            afterEach(() => {
                jest.clearAllMocks();
            })
            afterAll(() => {
                jest.restoreAllMocks();
            });
            it("should return false with no path and print warning", () => {
                mockExists.mockReturnValue(false);
                const path = getConfigPath("test.json");
                expect(path).toEqual(false);
                expect(mockExists.mock.calls.length).toEqual(1);
                expect(mockPrint.mock.calls.length).toEqual(1);
            });
            it("should return throw an error with no path", () => {
                mockExists.mockReturnValue(false);
                const caller = () => {
                    getConfigPath("test.json", true);
                }
                expect(caller).toThrowError();
                expect(mockExists.mock.calls.length).toEqual(1);
            });
            it("should return path", () => {
                mockExists.mockReturnValue(true);
                mockPath.mockReturnValue("test.json")
                const path = getConfigPath(
                    "test.json"
                );
                expect(path).toEqual("test.json");
                expect(mockExists.mock.calls.length).toEqual(1);
                expect(mockPrint.mock.calls.length).toEqual(0);
            });
        });
    });
});
