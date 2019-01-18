import "jest";
import HttpInternalServerErrorException from "./InternalServerErrorException";

const name = "HttpInternalServerErrorException";
const defaultMessage = "Internal Server Error";
const exception = new HttpInternalServerErrorException();

describe("@pixeloven/exceptions", () => {
    describe("HttpInternalServerErrorException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new HttpInternalServerErrorException(customMsg);
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
                expect(exception.getStatusCode()).toEqual(500);
            });
        });
        it("can be thrown and have instanceof checked", () => {
            const throwable = () => {
                throw exception;
            };
            expect(throwable).toThrow(HttpInternalServerErrorException);
            expect(exception).toBeInstanceOf(HttpInternalServerErrorException);
        });
    });
});
