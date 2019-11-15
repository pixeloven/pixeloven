import "jest";
import { Routing } from "./index";

describe("@pixeloven-react/routing", () => {
    describe("utils/index", () => {
        it("should export Router", () => {
            expect(typeof Routing.getConfig).toEqual("function");
            expect(typeof Routing.getMatches).toEqual("function");
        });
    });
});
