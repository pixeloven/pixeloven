import "jest";
import { config } from "./config";

describe("client/config", () => {
    it("contains basePath property", () => {
        expect(config).toHaveProperty("baseUrl");
    });
    it("contains environment property", () => {
        expect(config).toHaveProperty("environment");
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
