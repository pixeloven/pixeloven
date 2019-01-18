import "jest";
import NotFoundException from "./NotFoundException";

const name = "NotFoundException";
const defaultMessage = "Not Found";
const exception = new NotFoundException();

describe("@pixeloven/exceptions", () => {
    describe("NotFoundException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new NotFoundException(customMsg);
                expect(defaultException.message).toEqual(customMsg);
            });
        });
        describe("exception.name", () => {
            it(`property should be set the class name "${name}"`, () => {
                expect(exception.name).toEqual(name);
            });
        });
        describe("getStatusCode", () => {
            it(`method should contain status code`, () => {
                expect(exception.getStatusCode()).toEqual(404);
            });
        });
        it("can be thrown and have instanceof checked", () => {
            const throwable = () => {
                throw exception;
            };
            expect(throwable).toThrow(NotFoundException);
            expect(exception).toBeInstanceOf(NotFoundException);
        });
    });
});
