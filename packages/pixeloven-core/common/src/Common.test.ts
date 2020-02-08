import "jest";
import { getKeys, mergeOptions } from "./index";

enum TestEnum {
    One,
    Two,
    Three,
}

describe("@pixeloven-core/common", () => {
    describe("Common", () => {
        /**
         * @todo Need to re-visit this function as it doesn't quite fit all the cases we might expect
         */
        describe("getKeys", () => {
            it(`should return array of 3 values from default filter of "number"`, () => {
                expect(getKeys(TestEnum)).toEqual(["One", "Two", "Three"]);
            });
            xit(`should return empty array with filter of "string"`, () => {
                expect(getKeys(TestEnum, "string")).toEqual([]);
            });
        });
        describe("mergeOptions", () => {
            it(`should merge a default object and a partial together`, () => {
                const defaultOptions = {
                    propOne: 1,
                    propTwo: 2,
                };

                expect(
                    mergeOptions(defaultOptions, {
                        propTwo: 4,
                    }),
                ).toEqual({
                    propOne: 1,
                    propTwo: 4,
                });
            });
        });
    });
});
