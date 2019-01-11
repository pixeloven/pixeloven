import "jest";
import {
    hasClientCodePath,
    hasServerCodePath
} from "./macros";

describe("@pixeloven/webpack", () => {
    describe("utils", () => {
        describe("macros", () => {
            describe("hasClientCodePath", () => {
                it("should return whether path exists", () => {
                    expect(typeof hasClientCodePath()).toEqual("boolean");
                });
            });
            describe("hasServerCodePath", () => {
                it("should return whether path exists", () => {
                    expect(typeof hasServerCodePath()).toEqual("boolean");
                });
            });
        });
    });
});
