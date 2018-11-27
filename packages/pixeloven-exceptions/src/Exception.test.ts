import "jest";
import Exception from "./Exception";

const name = "Exception";
const message = "testing";
const exception = new Exception(message);

describe("@pixeloven/exceptions", () => {
    describe("Exception", () => {
        describe("exception.message", () => {
            it(`property should return string "${message}"`, () => {
                expect(exception.message).toEqual(message);
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
            it(`method should contain stack trace with string "Exception"`, () => {
                expect(exception.getStack()).toContain("Exception");
            });
        });
        it("can be thrown and have instanceof checked", () => {
            const throwable = () => {
                throw exception;
            };
            expect(throwable).toThrow(Exception);
            expect(exception).toBeInstanceOf(Exception);
        });
    });
});
