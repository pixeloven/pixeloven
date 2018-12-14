import "jest";
import { register } from "./index";

jest.mock("offline-plugin/runtime", () => ({ install: jest.fn() }));

describe("Client/ServiceWorkers", () => {
    describe("index", () => {
        describe("register", () => {
            afterEach(() => {
                // Jest sets NODE_ENV so we need to set it back
                process.env.NODE_ENV = "test";
            });
            it("should do nothing if environment equals development", () => {
                process.env.NODE_ENV = "development";
                register();
            });
            it("should install OfflinePluginRuntime if environment equals production", () => {
                process.env.NODE_ENV = "production";
                register();
            });
        });
    });
});
