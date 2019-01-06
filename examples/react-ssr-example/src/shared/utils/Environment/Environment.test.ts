import "jest";
import { Environment } from "./Environment";

describe("Shared/Environment", () => {
    describe("Environment", () => {
        describe("isDocker", () => {
            it(`should return true`, () => {
                const env = new Environment({
                    domain: "testing.com",
                    environment: "development",
                    machine: "docker",
                    target: "node",
                });
                expect(env.isDocker).toBeTruthy();
            });
            it(`should return false`, () => {
                const env = new Environment({
                    domain: "testing.com",
                    environment: "development",
                    machine: "aws",
                    target: "node",
                });
                expect(env.isDocker).toBeFalsy();
            });
        });
        describe("isServer", () => {
            it(`should return true`, () => {
                const env = new Environment({
                    domain: "testing.com",
                    environment: "development",
                    machine: "docker",
                    target: "node",
                });
                expect(env.isServer).toBeTruthy();
            });
            it(`should return false`, () => {
                const env = new Environment({
                    domain: "testing.com",
                    environment: "development",
                    machine: "docker",
                    target: "web",
                });
                expect(env.isServer).toBeFalsy();
            });
        });
    });
});
