import "jest";
import * as exceptions from "./index";

describe("@pixeloven-core/exceptions", () => {
    describe("index", () => {
        it("should export Exception", () => {
            expect(typeof exceptions.Exception).toEqual("function");
        });
        describe("File", () => {
            it("should export FileNotFoundException", () => {
                expect(typeof exceptions.FileNotFoundException).toEqual(
                    "function",
                );
            });
        });
        describe("Http", () => {
            it("should export HttpBadRequestException", () => {
                expect(typeof exceptions.HttpBadRequestException).toEqual(
                    "function",
                );
            });
            it("should export HttpForbiddenException", () => {
                expect(typeof exceptions.HttpForbiddenException).toEqual(
                    "function",
                );
            });
            it("should export HttpInternalServerErrorException", () => {
                expect(
                    typeof exceptions.HttpInternalServerErrorException,
                ).toEqual("function");
            });
            it("should export HttpNotFoundException", () => {
                expect(typeof exceptions.HttpNotFoundException).toEqual(
                    "function",
                );
            });
            it("should export HttpResponseException", () => {
                expect(typeof exceptions.HttpResponseException).toEqual(
                    "function",
                );
            });
        });
        describe("Node", () => {
            it("should export NodeProcessException", () => {
                expect(typeof exceptions.NodeProcessException).toEqual(
                    "function",
                );
            });
            it("should export NodeInvalidArgumentException", () => {
                expect(typeof exceptions.NodeInvalidArgumentException).toEqual(
                    "function",
                );
            });
        });
    });
});
