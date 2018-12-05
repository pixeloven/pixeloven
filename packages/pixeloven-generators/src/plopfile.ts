import {Plop} from "./plop";
/**
 * Acceptable types
 */
const componentTypes = ["atom", "molecule", "organism", "page", "template"]

/**
 * Validate component type
 * @param componentType
 */
const validateComponentType = (componentType: string) => {
    return !componentTypes.find((value) => componentType === value) 
        ? "Component type must be one of the following: atom, molecule, organism, page, template" 
        : true;
}

/**
 * Validate component name
 * @param componentType
 */
const validateComponentName = (componentName: string) => {
    if (/.+/.test(componentName.trim())) { 
        return true;
    }
    return "Component name is required."
}

/**
 * @todo need to resolve all these paths
 * @todo should document these paths
 * @todo should create a generator to create an app based on these paths
 * @todo should create a generator to create package (current template)
 * @todo https://github.com/amwmedia/plop/blob/master/example/plopfile.js
 */
const generator = (plop: Plop) => {
    plop.setHelper("capitalize", (txt: string) => txt.charAt(0).toUpperCase() + txt.toLowerCase().slice(1));
    plop.setHelper("plural", (txt: string) => `${txt}s`);
    plop.setHelper("upperCase", (txt: string) => txt.toUpperCase());
    plop.setHelper("lowerCase", (txt: string) => txt.toLowerCase());

    plop.setGenerator("component", {
        actions: [
            {
                abortOnFail: true,
                path: "src/shared/components/{{plural (lowerCase componentType)}}/{{componentName}}/README.md",
                templateFile: "templates/Component/README.md.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: "src/shared/components/{{plural (lowerCase componentType)}}/{{componentName}}/index.ts",
                templateFile: "templates/Component/index.ts.hbs",
                type: "add",            },
            {
                abortOnFail: true,
                path: "src/shared/components/{{plural (lowerCase componentType)}}/{{componentName}}/{{componentName}}.tsx",
                templateFile: "templates/Component/Component.tsx.hbs",
                type: "add",
            },
            {
                abortOnFail: true,
                path: "src/shared/components/{{plural (lowerCase componentType)}}/{{componentName}}/{{componentName}}.stories.tsx",
                templateFile: "templates/Component/Component.stories.tsx.hbs",
                type: "add",

            },
            {
                abortOnFail: true,
                path: "src/shared/components/{{plural (lowerCase componentType)}}/{{componentName}}/{{componentName}}.test.tsx",
                templateFile: "templates/Component/Component.test.tsx.hbs",
                type: "add",
            },
        ],
        description: "Generate a new Atomic component",
        prompts: [
            {
                message: "What \"type\" of Atomic component is this?",
                name: "componentType",
                type: "input",
                validate: validateComponentType
            },
            {
                message: 'What is the name of the new component?',
                name: "componentName",
                type: "input",
                validate: validateComponentName
            }
        ]
    })
}

export default generator;
