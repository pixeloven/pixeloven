import "jest";
import "./addons";

describe("@pixeloven/docs", () => {
    describe("configs", () => {
        describe("addons", () => {
            it("register plugins", () => {
                const KEY = "__STORYBOOK_ADDONS";
                expect(global).toHaveProperty(KEY);
            });
        });
    });
});
