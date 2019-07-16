import "jest";
import Logger from "./Logger";

const logInstance = Logger.getInstance();

describe("@pixeloven/node-logger", () => {
    describe("Logger", () => {
        afterAll(() => {
            jest.restoreAllMocks();
        });
        describe("error", () => {
            const spyError = jest
                .spyOn(logInstance, "log")
                .mockImplementation();
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
                .spyOn(logInstance, "log")
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
        /**
         * @todo Need to add success but it's not a given type for winston so we need to extend it.
         */
        describe("success", () => {
            const spySuccess = jest
                .spyOn(logInstance, "log")
                .mockImplementation();
            afterEach(() => {
                jest.clearAllMocks();
            });
            it('should log "string" to console', () => {
                Logger.success("test1");
                expect(spySuccess).toHaveBeenCalledTimes(1);
            });
            it('should log "string[]" to console', () => {
                Logger.success(["test1", "test2"]);
                expect(spySuccess).toHaveBeenCalledTimes(2);
            });
        });
        describe("warn", () => {
            const spyWarn = jest
                .spyOn(logInstance, "log")
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
        describe("getInstance", () => {
            it('should log "string" to console', () => {
                expect(Logger.getInstance()).toBeTruthy();
            });
        });
    });
});
