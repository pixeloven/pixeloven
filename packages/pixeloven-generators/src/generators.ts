import { resolvePath } from "@pixeloven/core";
import { Plop } from "./plop";

/**
 * Acceptable atomic types
 */
const atomicTypes = [
    "atom",
    "molecule",
    "organism",
    "page",
    "partial",
    "template",
];

/**
 * Acceptable component types
 */
const componentTypes = ["function", "class"];

/**
 * Allowed request methods
 */
const requestMethods = ["DELETE", "GET", "POST", "PUT"];

/**
 * Validate word
 * @param word
 */
export const validateWord = (word: string) => {
    if (word.length > 0) {
        if (/^[a-z]+$/i.test(word.trim())) {
            return true;
        }
        return "Must be a valid alpha string.";
    }
    return `Must be a minimum of 1 character.`;
};

/**
 * Creates a validator that checks min length
 * @param min
 */
export const makeValidateMinLength = (min: number) => {
    return (str: string) => {
        if (str.length >= min) {
            return true;
        }
        return `Must be a minimum of ${min} characters.`;
    };
};

/**
 * Modifiers for templates
 * @param txt
 */
export const capitalize = (txt: string) =>
    txt.charAt(0).toUpperCase() + txt.toLowerCase().slice(1);
export const plural = (txt: string) => `${txt}s`;
export const upperCase = (txt: string) => txt.toUpperCase();
export const lowerCase = (txt: string) => txt.toLowerCase();

/**
 * @todo should check filesystem for serviceName, and components etc
 * @todo need to resolve all these paths
 * @todo should document these paths
 * @todo should create a generator to create an app based on these paths
 * @todo should create a generator to create package (current template)
 * @todo https://github.com/amwmedia/plop/blob/master/example/plopfile.js
 *
 * @todo Add options to generate functional vs Class... also with state or without
 */
const componentPath = resolvePath("src/shared/components", false);
const storePath = resolvePath("src/shared/store", false);
const generator = (plop: Plop) => {
    plop.setHelper("capitalize", capitalize);
    plop.setHelper("plural", plural);
    plop.setHelper("upperCase", upperCase);
    plop.setHelper("lowerCase", lowerCase);

    plop.setGenerator("component", {
        actions: [
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase atomicType)}}/{{componentName}}/README.md`,
                templateFile: "templates/Component/README.md.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase atomicType)}}/{{componentName}}/index.ts`,
                templateFile: "templates/Component/index.ts.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase atomicType)}}/{{componentName}}/{{componentName}}.tsx`,
                templateFile:
                    "templates/Component/{{componentType}}.Component.tsx.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase atomicType)}}/{{componentName}}/{{componentName}}.stories.tsx`,
                templateFile: "templates/Component/Component.stories.tsx.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase atomicType)}}/{{componentName}}/{{componentName}}.test.tsx`,
                templateFile: "templates/Component/Component.test.tsx.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase atomicType)}}/{{componentName}}/{{componentName}}.scss`,
                templateFile: "templates/Component/Component.scss.hbs",
                type: "add",
            },
        ],
        description: "Generate a new Atomic component",
        prompts: [
            {
                choices: atomicTypes,
                message: `What "type" of Atomic component is this?`,
                name: "atomicType",
                type: "list",
            },
            {
                choices: componentTypes,
                message: "Is this a functional or class component?",
                name: "componentType",
                type: "list",
            },
            {
                default: true,
                message: "Will this component need to manage state?",
                name: "includeState",
                type: "confirm",
            },
            {
                message: "What is the name of the new component?",
                name: "componentName",
                type: "input",
                validate: validateWord,
            },
            {
                message: "Provide a brief description of this component:",
                name: "componentDescription",
                type: "input",
                validate: makeValidateMinLength(1),
            },
        ],
    });
    plop.setGenerator("store", {
        actions: [
            {
                abortOnFail: true,
                path: `${storePath}/{{capitalize serviceName}}/{{capitalize serviceName}}.actions.ts`,
                templateFile: "templates/Store/Store.actions.ts.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${storePath}/{{capitalize serviceName}}/{{capitalize serviceName}}.reducers.ts`,
                templateFile: "templates/Store/Store.reducers.ts.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${storePath}/{{capitalize serviceName}}/{{capitalize serviceName}}.sagas.ts`,
                templateFile: "templates/Store/Store.sagas.ts.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${storePath}/{{capitalize serviceName}}/{{capitalize serviceName}}.selectors.ts`,
                templateFile: "templates/Store/Store.selectors.ts.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${storePath}/{{capitalize serviceName}}/{{capitalize serviceName}}.service.ts`,
                templateFile: "templates/Store/Store.service.ts.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${storePath}/{{capitalize serviceName}}/{{capitalize serviceName}}.types.ts`,
                templateFile: "templates/Store/Store.types.ts.hbs",
                type: "add",
            },
        ],
        description: "Generate a new service, resource and store boilerplate",
        prompts: [
            {
                message: `What is the "name" of the service? (I.E. iss)`,
                name: "serviceName",
                type: "input",
                validate: validateWord,
            },
            /**
             * @todo We should ask how many resources are on this service and to name them
             */
            {
                message: `What is the "name" a resource on this service? (I.E. location)`,
                name: "resourceName",
                type: "input",
                validate: validateWord,
            },
            {
                choices: requestMethods,
                message: "How will we be communicating to this first resource?",
                name: "serviceType",
                type: "list",
            },
        ],
    });
};

export default generator;
