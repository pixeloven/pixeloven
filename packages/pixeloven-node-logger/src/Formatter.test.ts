import "jest";
import Formatter from "./Formatter";

describe("@pixeloven/node-logger", () => {
    describe("Formatter", () => {
        describe("console", () => {
            it('should create winston formatter', () => {
                expect(typeof Formatter.console).toEqual("object");
            });
        });
        describe("getColor", () => {
            it(`should be of type function`, () => {
                expect(typeof Formatter.getColor).toEqual("function");
            });
            it(`should get "error" color function`, () => {
                const color = Formatter.getColor("error");
                expect(typeof color).toEqual("function");
            });
            it(`should get "info" color function`, () => {
                const color = Formatter.getColor("info");
                expect(typeof color).toEqual("function");
            });
            it(`should get "notice" color function`, () => {
                const color = Formatter.getColor("info");
                expect(typeof color).toEqual("function");
            });
            it(`should get "success" color function`, () => {
                const color = Formatter.getColor("success");
                expect(typeof color).toEqual("function");
            });
            it(`should get "warn" color function`, () => {
                const color = Formatter.getColor("warn");
                expect(typeof color).toEqual("function");
            });
            it(`should get "warning" color function`, () => {
                const color = Formatter.getColor("warn");
                expect(typeof color).toEqual("function");
            });
            it(`should get "default" color function`, () => {
                const color = Formatter.getColor();
                expect(typeof color).toEqual("function");
            });
        });
    });
});
