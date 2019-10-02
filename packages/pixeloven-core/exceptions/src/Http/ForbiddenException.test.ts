import "jest";
import ForbiddenException from "./ForbiddenException";

const name = "ForbiddenException";
const defaultMessage = "Forbidden";
const exception = new ForbiddenException();

describe("@pixeloven-core/exceptions", () => {
    describe("ForbiddenException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new ForbiddenException(customMsg);
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
                expect(exception.getStatusCode()).toEqual(403);
            });
        });
        it("can be thrown and have instanceof checked", () => {
            const throwable = () => {
                throw exception;
            };
            expect(throwable).toThrow(ForbiddenException);
            expect(exception).toBeInstanceOf(ForbiddenException);
        });
    });
});
