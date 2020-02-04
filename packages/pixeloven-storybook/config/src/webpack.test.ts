import "jest";
import { Configuration } from "webpack";
import getConfig from "./webpack";

/**
 * @todo need to make this more testable
 */
/* tslint:disable no-object-literal-type-assertion */
describe("@pixeloven-storybook/config", () => {
    describe("webpack.config", () => {
        it("should export function as default", () => {
            expect(typeof getConfig).toEqual("function");
        });
        it("should return a config option upon execution", () => {
            const config = {
                resolve: {},
            } as Configuration;
            expect(typeof getConfig(config)).toEqual("object");
        });
    });
});
