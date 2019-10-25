import "jest";
import { getServer, Server } from "./index";

describe("@pixeloven-webpack/server", () => {
    describe("index", () => {
        it("should export Server", () => {
            expect(typeof Server).toEqual("function");
        });
        it("should export getServer", () => {
            expect(typeof getServer).toEqual("function");
        });
    });
});
