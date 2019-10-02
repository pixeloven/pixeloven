import "jest";
import { resolveSourceRoot, resolveTsConfig } from "./macros";

describe("@pixeloven-storybook/config", () => {
    describe("configs", () => {
        describe("macros", () => {
            it("resolveSourceRoot should resolve src root", () => {
                expect(resolveSourceRoot()).toContain("/src");
            });
            it("resolveTsConfig should resolve ts config", () => {
                expect(resolveTsConfig()).toContain("/tsconfig.json");
            });
        });
    });
});
