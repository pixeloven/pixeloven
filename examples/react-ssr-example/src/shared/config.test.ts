import "jest";
import { config } from "./config";

describe("client/config", () => {
    it("contains publicPath property", () => {
        expect(config).toHaveProperty("publicPath");
    });
    it("contains target property", () => {
        expect(config).toHaveProperty("target");
    });
});
