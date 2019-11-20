import "jest";
import { Configuration } from "webpack";
import storybook from "./webpack.config";

const mode = "production";

/**
 * @todo need to make this more testable
 */
/* tslint:disable no-object-literal-type-assertion */
describe("@pixeloven-storybook/config", () => {
    describe("configs", () => {
        describe("webpack.config", () => {
            it("should return config untouched", () => {
                const config = {} as Configuration;
                expect(typeof storybook({ config, mode })).toEqual("object");
            });
            it("should add new properties into the config", () => {
                const config = {
                    resolve: {},
                } as Configuration;
                expect(typeof storybook({ config, mode })).toEqual("object");
            });
            it("should add push into existing properties", () => {
                const config = {
                    module: {},
                    plugins: [],
                    resolve: {},
                } as Configuration;
                expect(typeof storybook({ config, mode })).toEqual("object");
            });
        });
    });
});
