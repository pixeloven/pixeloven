import "jest";
import * as exported from "./index";

describe("@pixeloven/react-router-config", () => {
    describe("index", () => {
        it("should export components and utils", () => {
            expect(typeof exported.Routes).toEqual("function");
            expect(typeof exported.Status).toEqual("function");
            expect(typeof exported.Router).toEqual("object");
            expect(typeof exported.Router.getConfig).toEqual("function");
            expect(typeof exported.Router.getMatches).toEqual("function");
        });
    });
});
