import { Mode, Name, Target } from "@pixeloven-core/env";
import "jest";
import getCompiler, { Compiler } from "./index";

describe("@pixeloven-webpack/compiler", () => {
    describe("index", () => {
        it("should export Compiler", () => {
            expect(typeof Compiler).toEqual("function");
        });
        it("should export getCompiler", () => {
            expect(typeof getCompiler).toEqual("function");
        });

        describe("Compiler", () => {
            it("should throw an error when passed an invalid name", () => {
                expect(() => {
                    Compiler.create([{ name: "foo" }]);
                }).toThrow(Error);
            });
            it("should throw an error when passed an invalid name within the second configs", () => {
                expect(() => {
                    Compiler.create([{ name: "client" }, { name: "foo" }]);
                }).toThrow(Error);
            });

            it("should return a webpack Compiler object when passed a valid name in both configs", () => {
                expect(
                    typeof Compiler.create([
                        { name: "client" },
                        { name: "server" },
                    ]),
                ).toEqual("object");
            });
        });

        describe("getCompiler", () => {
            it("should throw an error due to hard coded client and server index files", () => {
                expect(() => {
                    getCompiler();
                }).toThrow(Error);
            });
            it("should throw an error due to hard coded client and server index files", () => {
                expect(() => {
                    getCompiler({
                        compilers: [],
                        outputPath: "./dist",
                        profiling: false,
                        publicPath: "/",
                        sourceMap: false,
                        stats: {
                            enabled: false,
                            host: "localhost",
                            outputDir: "./stats",
                            port: 8081,
                        },
                    });
                }).toThrow(Error);
            });
            it("should throw an error due to hard coded client and server index files", () => {
                expect(() => {
                    getCompiler({
                        compilers: [
                            {
                                entry: "./src/index.ts",
                                mode: Mode.production,
                                name: Name.client,
                                target: Target.web,
                            },
                        ],
                        outputPath: "./dist",
                        profiling: false,
                        publicPath: "/",
                        sourceMap: false,
                        stats: {
                            enabled: false,
                            host: "localhost",
                            outputDir: "./stats",
                            port: 8081,
                        },
                    });
                }).toThrow(Error);
            });
        });
    });
});
