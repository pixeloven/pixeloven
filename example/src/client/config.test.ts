import "jest";
import { config } from "./config";

describe("Client", () => {
    describe("config", () => {
        it("contains basePath property", () => {
            expect(config).toHaveProperty("basePath");
        });
        it("contains environment property", () => {
            expect(config).toHaveProperty("environment");
        });
    });
});
