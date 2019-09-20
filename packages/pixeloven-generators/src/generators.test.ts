import "jest";
import generator, {
    camelCase,
    capitalize,
    firstChar,
    kebabCase,
    lowerCase,
    makeValidateMinLength,
    pascalCase,
    plural,
    upperCase,
    validateWord,
} from "./generators";
import { HelperFunction, Plop, PlopGenerator } from "./plop";

interface PlopGenerators {
    [name: string]: PlopGenerator;
}

interface HelperFunctions {
    [name: string]: HelperFunction;
}

const plopGenerators: PlopGenerators = {};
const plopHelpers: HelperFunctions = {};

const MockPlop: Plop = {
    getGenerator: (name: string): PlopGenerator => {
        return plopGenerators[name];
    },
    getHelper: (name: string): HelperFunction => {
        return plopHelpers[name];
    },
    setGenerator: (name: string, config: PlopGenerator): PlopGenerator => {
        plopGenerators[name] = config;
        return plopGenerators[name];
    },
    setHelper: (name: string, fn: HelperFunction): void => {
        plopHelpers[name] = fn;
    },
};

describe("@pixeloven/generators", () => {
    describe("plopfile", () => {
        describe("generator", () => {
            it(`should set "generators" and "helpers"`, () => {
                generator(MockPlop);
                expect(typeof MockPlop.getGenerator("component")).toEqual(
                    "object",
                );
                expect(typeof MockPlop.getGenerator("store")).toEqual("object");
                expect(typeof MockPlop.getHelper("capitalize")).toEqual(
                    "function",
                );
                expect(typeof MockPlop.getHelper("plural")).toEqual("function");
                expect(typeof MockPlop.getHelper("upperCase")).toEqual(
                    "function",
                );
                expect(typeof MockPlop.getHelper("lowerCase")).toEqual(
                    "function",
                );
            });
        });
        describe("validateWord", () => {
            it(`should fail with empty string`, () => {
                expect(typeof validateWord("")).toEqual("string");
            });
            it(`should fail with value "not_word"`, () => {
                expect(typeof validateWord("not_word")).toEqual("string");
            });
            it(`should pass with value "word"`, () => {
                const value = validateWord("word");
                expect(typeof value).toEqual("boolean");
                expect(value).toEqual(true);
            });
        });
        describe("validateMinLength", () => {
            it(`should create min length validator and fail`, () => {
                const validateMinLength = makeValidateMinLength(2);
                expect(typeof validateMinLength).toEqual("function");
                expect(typeof validateMinLength("t")).toEqual("string");
            });
            it(`should create min length validator and pass`, () => {
                const validateMinLength = makeValidateMinLength(1);
                expect(typeof validateMinLength).toEqual("function");
                expect(validateMinLength("t")).toEqual(true);
            });
        });
        describe("firstChar", () => {
            it("should return the first character as lower case", () => {
                expect(firstChar("Test")).toEqual("t");
            })
        })
        describe("capitalize", () => {
            it("should lower case word and upper case first letter", () => {
                expect(capitalize("TEST")).toEqual("Test");
            });
        });
        describe("lowerCase", () => {
            it("should lower case word", () => {
                expect(lowerCase("TEST")).toEqual("test");
            });
        });
        describe("plural", () => {
            it(`should append an "s" to the end of a string`, () => {
                expect(plural("test")).toEqual("tests");
            });
        });
        describe("upperCase", () => {
            it("should upper case word", () => {
                expect(upperCase("test")).toEqual("TEST");
            });
        });
        describe("camelCase", () => {
            it("should camel case word", () => {
                expect(camelCase("TestWord")).toEqual("testWord");
                expect(camelCase("Test word")).toEqual("testWord");
                expect(camelCase("Test-word")).toEqual("testWord");
            });
        });
        describe("pascalCase", () => {
            it("should pascal case word", () => {
                expect(pascalCase("testWord")).toEqual("TestWord");
                expect(pascalCase("test word")).toEqual("TestWord");
                expect(pascalCase("test-word")).toEqual("TestWord");
            });
        });
        describe("kebabCase", () => {
            it("should kebab case word", () => {
                expect(kebabCase("test word")).toEqual("test-word");
                expect(kebabCase("TestWord")).toEqual("test-word");
                expect(kebabCase("testWord")).toEqual("test-word");
            });
        });
    });
});
