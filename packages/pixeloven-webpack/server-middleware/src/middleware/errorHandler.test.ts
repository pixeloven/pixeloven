import "jest";
import httpMocks from "node-mocks-http";
import sinon, { SinonSandbox } from "sinon";
import errorHandler from "./errorHandler";

describe("@pixeloven-webpack/server", () => {
    describe("middleware", () => {
        describe("errorHandler", () => {
            let sandbox: SinonSandbox;
            beforeEach(() => {
                sandbox = sinon.createSandbox();
            });
            afterEach(() => {
                sandbox.restore();
            });
            it(`should respond with 500`, () => {
                const mockError = new Error("testing");
                const mockRequest = httpMocks.createRequest();
                const mockResponse = httpMocks.createResponse();
                const mockNext = sinon.spy();
                mockResponse.headersSent = false;
                errorHandler(mockError, mockRequest, mockResponse, mockNext);
                expect(mockNext.callCount).toEqual(1);
                expect(mockResponse.statusCode).toEqual(500);
            });
            it(`should pass to built in error handler"`, () => {
                const mockError = new Error("testing");
                const mockRequest = httpMocks.createRequest();
                const mockResponse = httpMocks.createResponse();
                const mockNext = sinon.spy();
                mockResponse.headersSent = true;
                errorHandler(mockError, mockRequest, mockResponse, mockNext);
                expect(mockNext.callCount).toEqual(1);
                expect(mockResponse.statusCode).toEqual(200);
            });
        });
    });
});
