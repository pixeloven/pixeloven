import "jest";
import httpMocks from "node-mocks-http";
import errorHandler from "./errorHandler";

describe("Server/Middleware", () => {
    describe("errorHandler", () => {
        it(`should respond with 500"`, () => {
            const mockError = new Error("testing");
            const mockRequest = httpMocks.createRequest();
            const mockResponse = httpMocks.createResponse();
            const mockNext = jest.fn();
            mockResponse.headersSent = false;
            errorHandler(mockError, mockRequest, mockResponse, mockNext);
            expect(mockNext.mock.calls.length).toEqual(0);
            expect(mockResponse.statusCode).toEqual(500);
        });
        it(`should pass to built in error handler"`, () => {
            const mockError = new Error("testing");
            const mockRequest = httpMocks.createRequest();
            const mockResponse = httpMocks.createResponse();
            const mockNext = jest.fn((error: Error) => {
                expect(error.message).toEqual("testing");
            });
            mockResponse.headersSent = true;
            errorHandler(mockError, mockRequest, mockResponse, mockNext);
            expect(mockNext.mock.calls.length).toEqual(1);
            expect(mockResponse.statusCode).toEqual(200);
        });
    });
});
