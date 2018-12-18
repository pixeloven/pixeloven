import "jest";
import { Configuration } from "webpack";
import config, { newModule } from "./webpack.config";

/* tslint:disable no-object-literal-type-assertion */
describe("@pixeloven/docs", () => {
    describe("configs", () => {
        describe("webpack.config", () => {
            it("webpack config returns defaultConfig untouched", () => {
                const baseConfig = {} as Configuration;
                const defaultConfig = {} as Configuration;
                const expectedConfig = {} as Configuration;
                expect(config(baseConfig, {}, defaultConfig)).toEqual(
                    expectedConfig,
                );
            });
            it("webpack config returns defaultConfig and merges the module config", () => {
                const baseConfig = {} as Configuration;
                const defaultConfig = {
                    module: {},
                } as Configuration;
                const expectedConfig = {
                    module: newModule,
                } as Configuration;
                expect(config(baseConfig, {}, defaultConfig)).toEqual(
                    expectedConfig,
                );
            });
            it("webpack config returns defaultConfig and defines an alias to resolve", () => {
                const baseConfig = {} as Configuration;
                const defaultConfig = {
                    resolve: {},
                } as Configuration;
                const actualConfig = config(baseConfig, {}, defaultConfig);
                expect(actualConfig.resolve).toHaveProperty("alias");
                expect(actualConfig.resolve).toHaveProperty("alias.source");
            });
            it("webpack config returns defaultConfig and adds an alias to resolve", () => {
                const baseConfig = {} as Configuration;
                const defaultConfig = {
                    resolve: {
                        alias: {
                            original: "testing",
                        },
                    },
                } as Configuration;
                const actualConfig = config(baseConfig, {}, defaultConfig);
                expect(actualConfig.resolve).toHaveProperty("alias");
                expect(actualConfig.resolve).toHaveProperty("alias.original");
                expect(actualConfig.resolve).toHaveProperty("alias.source");
            });
            it("webpack config returns defaultConfig and defines extensions to resolve ", () => {
                const baseConfig = {} as Configuration;
                const defaultConfig = {
                    resolve: {},
                } as Configuration;
                const actualConfig = config(baseConfig, {}, defaultConfig);
                expect(actualConfig.resolve).toHaveProperty("extensions");
            });
            it("webpack config returns defaultConfig and adds extensions to resolve ", () => {
                const baseConfig = {} as Configuration;
                const defaultConfig = {
                    resolve: {
                        extensions: [".text"],
                    },
                } as Configuration;
                const actualConfig = config(baseConfig, {}, defaultConfig);
                expect(actualConfig.resolve).toHaveProperty("extensions");
            });
        });
    });
});
