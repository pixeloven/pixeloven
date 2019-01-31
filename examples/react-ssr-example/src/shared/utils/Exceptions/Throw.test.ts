import {
    HttpBadRequestException,
    HttpInternalServerErrorException,
    HttpNotFoundException,
} from "@pixeloven/exceptions";
import "jest";
import {
    throwHttpBadRequest,
    throwHttpInternalServerError,
    throwHttpNotFound,
} from "./Throw";

describe("Shared/Utils/String", () => {
    describe("throwHttpBadRequest", () => {
        it("can throw HttpBadRequestException", () => {
            const throwable = () => {
                throwHttpBadRequest();
            };
            expect(throwable).toThrow(HttpBadRequestException);
        });
    });
    describe("throwHttpInternalServerError", () => {
        it("can throw HttpInternalServerErrorException", () => {
            const throwable = () => {
                throwHttpInternalServerError();
            };
            expect(throwable).toThrow(HttpInternalServerErrorException);
        });
    });
    describe("throwHttpNotFound", () => {
        it("can throw HttpNotFoundException", () => {
            const throwable = () => {
                throwHttpNotFound();
            };
            expect(throwable).toThrow(HttpNotFoundException);
        });
    });
});
