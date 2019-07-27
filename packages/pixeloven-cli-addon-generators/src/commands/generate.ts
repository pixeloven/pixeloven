/**
 * @todo Remove as any once https://github.com/infinitered/gluegun/pull/564 is merged
 */
/* tslint:disable no-any */
import { Validation } from "@pixeloven/generators";
import { 
    AddonGeneratorsToolbox, 
    AtomicDesignType,
    CreateComponentOptions, 
    CreateOptions,
    GeneratorType,
    ProgrammingParadigm
} from "../types";

/**
 * @todo Might need to do some work for this to support the new proposed project layout...
 * @url https://github.com/SBoudrias/Inquirer.js/
 */
export default {
    alias: ["--generate", "-g"],
    name: "generate",
    run: async (toolbox: AddonGeneratorsToolbox) => {
        const { createComponent, print, pixelOven, prompt } = toolbox;
        // todo create generator for library
        // todo crete generator for addon
        // todo crete generator for state
        // Partial generators? 
        // Might need to ask questions about is this new or existing, App, CLI -> addon? Might need drop down like behavior

        function getKeys<T>(object: T) {
            return Object.keys(object).filter(key => typeof object[key] === "number");
        }

        /**
         * Starting generator type
         * @todo create CLI Addon, library, project generators
         */
        const askCreateQuestions = [{
            choices: getKeys(GeneratorType),
            message: 'What would you like to generate?',
            name: 'generatorType',
            type: 'select',
        }];

        /**
         * Acceptable atomic types
         */
        const askCreateComponentQuestions = [
            {
                choices: getKeys(AtomicDesignType),
                message: `What "type" of Atomic component is this?`,
                name: "componentAtomicType",
                type: 'select',
            },
            {
                choices: getKeys(ProgrammingParadigm),
                message: "Is this a functional or classical component?",
                name: "componentParadigmType",
                type: 'select',
            },
            {
                default: true,
                message: "Will this component need to manage state? (Y/N)",
                name: "componentHasState",
                type: "confirm",
            },
            {
                default: true,
                message: "Will this component require a stylesheet? (Y/N)",
                name: "componentHasStyle",
                type: "confirm",
            },
            {
                message: "What is the name of the new component?",
                name: "componentName",
                type: "input",
                validate: Validation.isAWord,
            },
            {
                message: "Provide a brief description of this component:",
                name: "componentDescription",
                type: "input",
                validate: Validation.minLength(1),
            },
        ];
        const { generatorType } = await prompt.ask<CreateOptions>(askCreateQuestions) as any;
        switch (generatorType) {
            case "App": {
                print.info("Coming Soon");
                break;
            }
            case "Component": {
                const options = await prompt.ask<CreateComponentOptions>(askCreateComponentQuestions) as any;
                createComponent(options);
            }
            case "Package": {
                print.info("Coming Soon");
                break;
            }
            case "Store": {
                print.info("Coming Soon");
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
