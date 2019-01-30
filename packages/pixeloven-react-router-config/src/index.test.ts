import "jest";
import * as exported from "./index";

describe("@pixeloven/react-router-config", () => {
    describe("index", () => {
        it("should export components and utils", () => {
            expect(typeof exported.Routes).toEqual("function");
            expect(typeof exported.Status).toEqual("function");
            expect(typeof exported.matchRoutes).toEqual("function");
            expect(typeof exported.convertRouteConfig).toEqual("function");
        });
    });
});
