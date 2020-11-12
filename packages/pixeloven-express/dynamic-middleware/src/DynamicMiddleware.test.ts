import { NextFunction, Request, Response } from "express";
import "jest";
import httpMocks from "node-mocks-http";
import sinon, { SinonSandbox } from "sinon";
import DynamicMiddleware from "./DynamicMiddleware";

let sandbox: SinonSandbox;

function goodMiddleware(req: Request, res: Response, next: NextFunction) {
    next();
}

function badMiddleware(req: Request, res: Response, next: NextFunction) {
    next(new Error("error"));
}

describe("@pixeloven-express/dynamic-middleware", () => {
    beforeAll(() => {
        sandbox = sinon.createSandbox();
    });
    describe("DynamicMiddleware", () => {
        it("should instantiate without layers", () => {
            const dynamicMiddleware = new DynamicMiddleware();
            expect(dynamicMiddleware.length).toEqual(0);
        });
        it("should instantiate with layers", () => {
            const dynamicMiddleware = new DynamicMiddleware([goodMiddleware]);
            expect(dynamicMiddleware.length).toEqual(1);
        });
        describe("clean", () => {
            const dynamicMiddleware = new DynamicMiddleware([goodMiddleware]);
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
            afterEach(() => {
                sandbox.restore();
            });
            const mockRequest = httpMocks.createRequest();
            const mockResponse = httpMocks.createResponse();
            it("should return a wrapper middleware and async exec each layer", (done) => {
                const dynamicMiddleware = new DynamicMiddleware([
                    goodMiddleware,
                ]);
                const spyNext = sinon.spy(done);
                const handler = dynamicMiddleware.handle();
                expect(typeof handler).toEqual("function");
                handler(mockRequest, mockResponse, spyNext);
                expect(spyNext.callCount).toEqual(1);
            });
            it("should return a wrapper middleware and call next with an error", (done) => {
                const dynamicMiddleware = new DynamicMiddleware([
                    badMiddleware,
                ]);
                const spyNext = sinon.spy((arg) => {
                    expect(arg).toBeInstanceOf(Error);
                    expect(arg.message).toEqual("error");
                    done();
                });
                const handler = dynamicMiddleware.handle();
                expect(typeof handler).toEqual("function");
                handler(mockRequest, mockResponse, spyNext);
                expect(spyNext.callCount).toEqual(1);
            });
        });
        describe("mount", () => {
            const dynamicMiddleware = new DynamicMiddleware();
            it("should add middleware to layers", () => {
                dynamicMiddleware.mount(goodMiddleware);
                expect(dynamicMiddleware.get().length).toEqual(1);
            });
        });
        describe("unmount", () => {
            const dynamicMiddleware = new DynamicMiddleware([goodMiddleware]);
            it("should remove middleware from layers", () => {
                dynamicMiddleware.unmount(goodMiddleware);
                expect(dynamicMiddleware.get().length).toEqual(0);
            });
        });
    });
});
