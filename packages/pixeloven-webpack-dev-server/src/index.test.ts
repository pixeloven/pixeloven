import "jest";
import { Server } from "./index";

describe("@pixeloven/webpack-dev-server", () => {
    describe("index", () => {
        it("should export Server", () => {
            expect(typeof Server).toEqual("function");
        });
    });
});
