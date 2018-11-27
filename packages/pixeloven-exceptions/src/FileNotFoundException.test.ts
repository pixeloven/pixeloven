import "jest";
import FileNotFoundException from "./FileNotFoundException";

const name = "FileNotFoundException";
const message = "testing";
const defaultMessage = "File not found.";
const exception = new FileNotFoundException(message);

describe("@pixeloven/exceptions", () => {
    describe("FileNotFoundException", () => {
        describe("exception.message", () => {
            it(`property should return string "${message}"`, () => {
                expect(exception.message).toEqual(message);
            });
            it(`property default should return string "${defaultMessage}"`, () => {
                const defaultException = new FileNotFoundException();
                expect(defaultException.message).toEqual(defaultMessage);
            });
        });
        describe("exception.name", () => {
            it(`property should return string "${name}"`, () => {
                expect(exception.name).toEqual(name);
            });
        });
        describe("getMessage", () => {
            it(`method should return string "${message}"`, () => {
                expect(exception.getMessage()).toEqual(message);
            });
        });
        describe("getName", () => {
            it(`method should return string "${name}"`, () => {
                expect(exception.getName()).toEqual(name);
            });
        });
        describe("getStack", () => {
            it(`method should contain stack trace with string "FileNotFoundException"`, () => {
                expect(exception.getStack()).toContain("FileNotFoundException");
            });
        });
        it("can be thrown and have instanceof checked", () => {
            const throwable = () => {
                throw exception;
            };
            expect(throwable).toThrow(FileNotFoundException);
            expect(exception).toBeInstanceOf(FileNotFoundException);
        });
    });
});
