import "jest";
import { config } from "./config";

describe("@shared/config", () => {
    it("contains name property", () => {
        expect(config).toHaveProperty("name");
    });
    it("contains publicPath property", () => {
        expect(config).toHaveProperty("publicPath");
    });
    it("contains target property", () => {
        expect(config).toHaveProperty("target");
    });
});
