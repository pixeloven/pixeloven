import "jest";
import ResponseException from "./ResponseException";

const name = "ResponseException";
const defaultMessage = "Response Error";
const exception = new ResponseException(400);

describe("@pixeloven/exceptions", () => {
    describe("ResponseException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new ResponseException(400, customMsg);
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
            expect(throwable).toThrow(ResponseException);
            expect(exception).toBeInstanceOf(ResponseException);
        });
    });
});