import "jest";
import NodeProcessException from "./ProcessException";

const name = "NodeProcessException";
const defaultMessage = "Node Process Error";
const exception = new NodeProcessException();

describe("@pixeloven/exceptions", () => {
    describe("NodeProcessException", () => {
        describe("exception.message", () => {
            it(`property should be set to default string`, () => {
                expect(exception.message).toEqual(defaultMessage);
            });
            it(`property should be set to custom string`, () => {
                const customMsg = "testing";
                const defaultException = new NodeProcessException(customMsg);
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
            expect(throwable).toThrow(NodeProcessException);
            expect(exception).toBeInstanceOf(NodeProcessException);
        });
    });
});
