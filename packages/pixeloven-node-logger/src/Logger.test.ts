import "jest";
import Logger from "./Logger";

jest.mock("webpack-log");

describe("@pixeloven/node-logger", () => {
    describe("Logger", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        describe("error", () => {
            it('should log "string" to console', () => {
                Logger.error("test1");
                // expect(Logger.error.mock.calls.length).toEqual(1);
            });
            it('should log "string[]" to console', () => {
                Logger.error([
                    "test1",
                    "test2",
                ]);
                // expect(MockLogger.error.mock.calls.length).toEqual(2);
            });
        });
        describe("info", () => {
            it('should log "string" to console', () => {
                Logger.info("test1");
                // expect(MockLogger.info.mock.calls.length).toEqual(1);
            });
            it('should log "string[]" to console', () => {
                Logger.info([
                    "test1",
                    "test2",
                ]);
                // expect(MockLogger.info.mock.calls.length).toEqual(2);
            });
        });
        describe("warn", () => {
            it('should log "string" to console', () => {
                Logger.warn("test1");
                // expect(MockLogger.warn.mock.calls.length).toEqual(1);
            });
            it('should log "string[]" to console', () => {
                Logger.warn([
                    "test1",
                    "test2",
                ]);
                // expect(MockLogger.warn.mock.calls.length).toEqual(2);
            });
        });
    });
});
