import "jest";
import ProcessException from "./ProcessException";

const name = "ProcessException";
const defaultMessage = "Node Process Error";
const exception = new ProcessException();

describe("@pixeloven/exceptions", () => {
    describe("ProcessException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new ProcessException(customMsg);
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
            expect(throwable).toThrow(ProcessException);
            expect(exception).toBeInstanceOf(ProcessException);
        });
    });
});
