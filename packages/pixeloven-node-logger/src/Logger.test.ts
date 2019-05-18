import "jest";
import Logger from "./Logger";

const logInstance = Logger.getInstance();

describe("@pixeloven/node-logger", () => {
    describe("Logger", () => {
        const spyError = jest.spyOn(logInstance, "error").mockImplementation();
        afterAll(() => {
            jest.restoreAllMocks();
        });
        describe("error", () => {
            afterEach(() => {
                jest.clearAllMocks();
            });
            it('should log "string" to console', () => {
                Logger.error("test1");
                expect(spyError).toHaveBeenCalledTimes(1);
            });
            it('should log "string[]" to console', () => {
                Logger.error(["test1", "test2"]);
                expect(spyError).toHaveBeenCalledTimes(2);
            });
        });
        describe("info", () => {
            const spyInfo = jest
                .spyOn(logInstance, "info")
                .mockImplementation();
            afterEach(() => {
                jest.clearAllMocks();
            });
            it('should log "string" to console', () => {
                Logger.info("test1");
                expect(spyInfo).toHaveBeenCalledTimes(1);
            });
            it('should log "string[]" to console', () => {
                Logger.info(["test1", "test2"]);
                expect(spyInfo).toHaveBeenCalledTimes(2);
            });
        });
        describe("warn", () => {
            const spyWarn = jest
                .spyOn(logInstance, "warn")
                .mockImplementation();
            afterEach(() => {
                jest.clearAllMocks();
            });
            it('should log "string" to console', () => {
                Logger.warn("test1");
                expect(spyWarn).toHaveBeenCalledTimes(1);
            });
            it('should log "string[]" to console', () => {
                Logger.warn(["test1", "test2"]);
                expect(spyWarn).toHaveBeenCalledTimes(2);
            });
        });
    });
});
