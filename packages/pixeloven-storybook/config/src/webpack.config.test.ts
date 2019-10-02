import "jest";
import { Configuration } from "webpack";
import storybook, { newModule } from "./webpack.config";

/**
 * @todo should create a generator to do this but for now let's disable this rule here
 */
/* tslint:disable no-object-literal-type-assertion */
describe("@pixeloven-storybook/config", () => {
    describe("configs", () => {
        describe("webpack.config", () => {
            it("webpack config returns config untouched", () => {
                const config = {} as Configuration;
                const expectedConfig = {} as Configuration;
                expect(storybook({ config })).toEqual(expectedConfig);
            });
            it("webpack config returns config and merges the module config", () => {
                const config = {
                    module: {},
                } as Configuration;
                const expectedConfig = {
                    module: newModule,
                } as Configuration;
                expect(storybook({ config })).toEqual(expectedConfig);
            });
            it("webpack config returns config and defines an alias to resolve", () => {
                const config = {
                    resolve: {},
                } as Configuration;
                const actualConfig = storybook({ config });
                expect(actualConfig.resolve).toHaveProperty("alias");
                expect(actualConfig.resolve).toHaveProperty("alias.@src");
            });
            it("webpack config returns config and adds an alias to resolve", () => {
                const config = {
                    resolve: {
                        alias: {
                            original: "testing",
                        },
                    },
                } as Configuration;
                const actualConfig = storybook({ config });
                expect(actualConfig.resolve).toHaveProperty("alias");
                expect(actualConfig.resolve).toHaveProperty("alias.original");
                expect(actualConfig.resolve).toHaveProperty("alias.@src");
            });
            it("webpack config returns config and adds an modules to resolve", () => {
                const config = {
                    resolve: {
                        alias: {
                            original: "testing",
                        },
                        modules: [],
                    },
                } as Configuration;
                const actualConfig = storybook({ config });
                expect(actualConfig.resolve).toHaveProperty("modules");
            });
            it("webpack config returns config and defines extensions to resolve ", () => {
                const config = {
                    resolve: {},
                } as Configuration;
                const actualConfig = storybook({ config });
                expect(actualConfig.resolve).toHaveProperty("extensions");
            });
            it("webpack config returns config and adds extensions to resolve ", () => {
                const config = {
                    resolve: {
                        extensions: [".text"],
                    },
                } as Configuration;
                const actualConfig = storybook({ config });
                expect(actualConfig.resolve).toHaveProperty("extensions");
            });
            it("webpack config returns config and adds plugins to resolve ", () => {
                const config = {
                    resolve: {
                        plugins: [],
                    },
                } as Configuration;
                const actualConfig = storybook({ config });
                expect(actualConfig.resolve).toHaveProperty("plugins");
            });
        });
    });
});
