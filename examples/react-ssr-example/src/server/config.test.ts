import "jest";
import { config } from "./config";

describe("@server/config", () => {
    it("contains name property", () => {
        expect(config).toHaveProperty("name");
    });
    it("contains publicPath property", () => {
        expect(config).toHaveProperty("publicPath");
    });
    it("contains domain property", () => {
        expect(config).toHaveProperty("domain");
    });
    it("contains environment property", () => {
        expect(config).toHaveProperty("environment");
    });
    describe("environment", () => {
        it("contains host property", () => {
            expect(config.environment).toHaveProperty("host");
        });
        it("contains node property", () => {
            expect(config.environment).toHaveProperty("node");
        });
    });
    it("contains name property", () => {
        expect(config).toHaveProperty("name");
    });
    it("contains target property", () => {
        expect(config).toHaveProperty("target");
    });
    it("contains server property", () => {
        expect(config).toHaveProperty("server");
    });
    describe("server", () => {
        it("contains host property", () => {
            expect(config.server).toHaveProperty("host");
        });
        it("contains port property", () => {
            expect(config.server).toHaveProperty("port");
        });
        it("contains protocol property", () => {
            expect(config.server).toHaveProperty("protocol");
        });
    });
});
