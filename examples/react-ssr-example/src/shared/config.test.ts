import "jest";
import { config } from "./config";

describe("client/config", () => {
    it("contains domain property", () => {
        expect(config).toHaveProperty("domain");
    });
    it("contains environment property", () => {
        expect(config).toHaveProperty("environment");
    });
    it("contains machine property", () => {
        expect(config).toHaveProperty("machine");
    });
    it("contains target property", () => {
        expect(config).toHaveProperty("target");
    });
});
