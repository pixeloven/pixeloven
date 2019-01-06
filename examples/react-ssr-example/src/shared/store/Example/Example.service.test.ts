import "jest";
import { getExample } from "./Example.service";

describe("shared/store/Example/Example.service", () => {
    describe("getExample", () => {
        it("takes a resource url and returns a promise", () => {
            expect(getExample("resource")).toHaveProperty("then");
        });
    });
});
