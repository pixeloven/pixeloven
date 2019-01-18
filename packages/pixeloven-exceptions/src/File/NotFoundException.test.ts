import "jest";
import FileNotFoundException from "./NotFoundException";

const name = "FileNotFoundException";
const defaultMessage = "File Not Found";
const exception = new FileNotFoundException();

describe("@pixeloven/exceptions", () => {
    describe("FileNotFoundException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new FileNotFoundException(customMsg);
                expect(defaultException.message).toEqual(customMsg);
            });
        });
        describe("exception.name", () => {
            it(`property should be set the class name "${name}"`, () => {
                expect(exception.name).toEqual(name);
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
