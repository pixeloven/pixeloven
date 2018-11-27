import "jest";
import NodeProcessException from "./NodeProcessException";

const name = "NodeProcessException";
const message = "testing";
const defaultMessage = "Node process error.";
const exception = new NodeProcessException(message);

describe("@pixeloven/exceptions", () => {
    describe("NodeProcessException", () => {
        describe("exception.message", () => {
            it(`property should return string "${message}"`, () => {
                expect(exception.message).toEqual(message);
            });
            it(`property default should return string "${defaultMessage}"`, () => {
                const defaultException = new NodeProcessException();
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
            it(`method should contain stack trace with string "NodeProcessException"`, () => {
                expect(exception.getStack()).toContain("NodeProcessException");
            });
        });
        it("can be thrown and have instanceof checked", () => {
            const throwable = () => {
                throw exception;
            }
            expect(throwable).toThrow(NodeProcessException);
            expect(exception).toBeInstanceOf(NodeProcessException);
        });
    });
});
