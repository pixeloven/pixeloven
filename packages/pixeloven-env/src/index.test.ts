import "jest";
import { env, Environment, Environments } from "./index";

describe("@pixeloven/env", () => {
    describe("index", () => {
        it("should export env, Environment and Environments", () => {
            const environment: Environment = "test";
            const environments: Environments = {};
            expect(typeof environment).toEqual("string");
            expect(typeof environments).toEqual("object");
            expect(typeof env).toEqual("function");
        });
    });
});
