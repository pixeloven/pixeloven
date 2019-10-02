import "jest";
import HttpBadRequestException from "./BadRequestException";

const name = "HttpBadRequestException";
const defaultMessage = "Bad Request";
const exception = new HttpBadRequestException();

describe("@pixeloven-core/exceptions", () => {
    describe("HttpBadRequestException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new HttpBadRequestException(customMsg);
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
                expect(exception.getStatusCode()).toEqual(400);
            });
        });
        it("can be thrown and have instanceof checked", () => {
            const throwable = () => {
                throw exception;
            };
            expect(throwable).toThrow(HttpBadRequestException);
            expect(exception).toBeInstanceOf(HttpBadRequestException);
        });
    });
});
