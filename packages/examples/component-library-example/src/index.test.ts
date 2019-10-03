import "jest";

import * as components from "./index";

describe("index", () => {
    it("exports an object", () => {
        expect(typeof components).toBe("object");
    });
});
