import { NextFunction, Request, Response } from "express";
import "jest";
import httpMocks from "node-mocks-http";
import DynamicMiddleware from "./DynamicMiddleware";

const exampleMiddleware = (req: Request, res: Response, next: NextFunction) =>
    next();

describe("@pixeloven-express/dynamic-middleware", () => {
    describe("DynamicMiddleware", () => {
        it("should instantiate without layers", () => {
            const dynamicMiddleware = new DynamicMiddleware();
            expect(dynamicMiddleware.get().length).toEqual(0);
        });
        it("should instantiate with layers", () => {
            const dynamicMiddleware = new DynamicMiddleware([
                exampleMiddleware,
            ]);
            expect(dynamicMiddleware.get().length).toEqual(1);
        });
        describe("clean", () => {
            const dynamicMiddleware = new DynamicMiddleware([
                exampleMiddleware,
            ]);
            it("should unmount all middleware", () => {
                dynamicMiddleware.clean();
                expect(dynamicMiddleware.get().length).toEqual(0);
            });
        });
        describe("get", () => {
            const dynamicMiddleware = new DynamicMiddleware();
            it("should return an array", () => {
                expect(Array.isArray(dynamicMiddleware.get())).toBeTruthy();
            });
        });
        describe("handle", () => {
            const dynamicMiddleware = new DynamicMiddleware([
                exampleMiddleware,
            ]);
            it("should return a wrapper middleware and async exec each layer", done => {
                const mockRequest = httpMocks.createRequest();
                const mockResponse = httpMocks.createResponse();
                const mockNext = jest.fn(done);
                const handler = dynamicMiddleware.handle();
                expect(typeof handler).toEqual("function");
                handler(mockRequest, mockResponse, mockNext);
                expect(mockNext.mock.calls.length).toEqual(1);
            });
        });
        describe("mount", () => {
            const dynamicMiddleware = new DynamicMiddleware();
            it("should add middleware to layers", () => {
                dynamicMiddleware.mount(exampleMiddleware);
                expect(dynamicMiddleware.get().length).toEqual(1);
            });
        });
        describe("unmount", () => {
            const dynamicMiddleware = new DynamicMiddleware([
                exampleMiddleware,
            ]);
            it("should remove middleware from layers", () => {
                dynamicMiddleware.unmount(exampleMiddleware);
                expect(dynamicMiddleware.get().length).toEqual(0);
            });
        });
    });
});
