import { resolvePath } from "@pixeloven/core";
import { Plop } from "./plop";

/**
 * Acceptable types
 */
const componentTypes = ["atom", "molecule", "organism", "page", "template"];

/**
 * Allowed request methods
 */
const requestMethods = ["DELETE", "GET", "POST", "PUT"];

/**
 * Validate component type
 * @param componentType
 */
export const validateComponentType = (componentType: string) => {
    return !componentTypes.find(value => componentType === value)
        ? "Component type must be one of the following: atom, molecule, organism, page, template"
        : true;
};

/**
 * Validate word
 * @param word
 */
export const validateWord = (word: string) => {
    if (/^[a-z]+$/i.test(word.trim())) {
        return true;
    }
    return "Must be a valid alpha string.";
};

/**
 * Validate component name
 * @param componentType
 */
export const validateRequestMethod = (requestMethod: string) => {
    return !requestMethods.find(value => requestMethod === value)
        ? "Must be a valid request method: DELETE, GET, POST, PUT"
        : true;
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
                path: `${componentPath}/{{plural (lowerCase componentType)}}/{{componentName}}/README.md`,
                templateFile: "templates/Component/README.md.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase componentType)}}/{{componentName}}/index.ts`,
                templateFile: "templates/Component/index.ts.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase componentType)}}/{{componentName}}/{{componentName}}.tsx`,
                templateFile: "templates/Component/Component.tsx.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase componentType)}}/{{componentName}}/{{componentName}}.stories.tsx`,
                templateFile: "templates/Component/Component.stories.tsx.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase componentType)}}/{{componentName}}/{{componentName}}.test.tsx`,
                templateFile: "templates/Component/Component.test.tsx.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: `${componentPath}/{{plural (lowerCase componentType)}}/{{componentName}}/{{componentName}}.scss`,
                templateFile: "templates/Component/Component.scss.hbs",
                type: "add",
            },
        ],
        description: "Generate a new Atomic component",
        prompts: [
            {
                message: 'What "type" of Atomic component is this?',
                name: "componentType",
                type: "input",
                validate: validateComponentType,
            },
            {
                message: "What is the name of the new component?",
                name: "componentName",
                type: "input",
                validate: validateWord,
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
                message: 'What is the "name" of the service? (I.E. iss)',
                name: "serviceName",
                type: "input",
                validate: validateWord,
            },
            {
                message:
                    'What is the "name" a resource on this service? (I.E. location)',
                name: "resourceName",
                type: "input",
                validate: validateWord,
            },
            {
                message:
                    "How will we be communicating to this first resource? (I.E. GET, POST, etc)",
                name: "serviceType",
                type: "input",
                validate: validateRequestMethod,
            },
        ],
    });
};

export default generator;
