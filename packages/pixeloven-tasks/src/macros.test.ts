import "jest";
import {getBaseUrl, getDefaultUrl, getHost, getPort, getPublicPath, getUrlObject} from "./macros";

describe("@pixeloven/tasks", () => {
    describe("macros", () => {
        describe("getBaseUrl", () => {
            it("should return base url from constants", () => {
                const url = getBaseUrl();
                expect(url).toEqual("http://localhost:8080/")
            });
        });
        describe("getDefaultUrl", () => {
            it("should return base url from .env values", () => {
                const url = getDefaultUrl();
                expect(url).toEqual("http://localhost:8080/")
            });
        });
        describe("getHost", () => {
            it("should return hostname from parsed baseUrl", () => {
                const host = getHost();
                expect(host).toEqual("localhost");
            });
        });
        describe("getPort", () => {
            it("should return numeric port", () => {
                const port = getPort();
                expect(port).toEqual(8080);
            });
        });
        describe("getPublicPath", () => {
            it("should return public path", () => {
                const path = getPublicPath();
                expect(path).toEqual("/");
            });
        });
        describe("getUrlObject", () => {
            it("should return an instance of Url", () => {
                const url = getBaseUrl();
                const object = getUrlObject(url);
                expect(typeof object).toBe("object");
            });
        });
    });
});
