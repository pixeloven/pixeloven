import "jest";

import * as components from "./index";

describe("index", () => {
    it("exports an object with functional components", () => {
        expect(typeof components).toBe("object");
        expect(typeof components.Logo).toBe("function");
    });
});
