import "jest";
import NodeInvalidArgumentException from "./ProcessException";

const name = "NodeInvalidArgumentException";
const defaultMessage = "Invalid argument exception";
const exception = new NodeInvalidArgumentException();

describe("@pixeloven/exceptions", () => {
    describe("NodeInvalidArgumentException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new NodeInvalidArgumentException(customMsg);
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
            expect(throwable).toThrow(NodeInvalidArgumentException);
            expect(exception).toBeInstanceOf(NodeInvalidArgumentException);
        });
    });
});
