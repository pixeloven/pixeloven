/**
 * @todo Remove as any once https://github.com/infinitered/gluegun/pull/564 is merged
 */
/* tslint:disable no-any */
import * as Validation from "@pixeloven-core/validation";
import {
    AddonGeneratorsToolbox,
    AtomicDesignType,
    CreateComponentOptions,
    CreateOptions,
    CreatePackageOptions,
    GeneratorType,
    ProgrammingParadigm,
} from "../types";

/**
 * @todo Might need to do some work for this to support the new proposed project layout...
 * @url https://github.com/SBoudrias/Inquirer.js/
 */
export default {
    name: "generate",
    run: async (toolbox: AddonGeneratorsToolbox) => {
        const {
            createComponent,
            createPackage,
            print,
            pixelOven,
            prompt,
        } = toolbox;
        // todo create generator for library
        // todo crete generator for addon
        // todo crete generator for state
        // Partial generators?
        // Might need to ask questions about is this new or existing, App, CLI -> addon? Might need drop down like behavior

        function getKeys<T>(object: T) {
            return Object.keys(object).filter(
                key => typeof object[key] === "number",
            );
        }

        /**
         * Starting generator type
         * @todo create CLI Addon, library, project generators
         */
        const askCreateQuestions = [
            // {
            //     choices: getKeys(ProjectType),
            //     filter: (txt: string) => !!ProjectType[txt],
            //     message: 'Is this a new or existing project?',
            //     name: 'isNewProject',
            //     type: 'select',
            // },
            {
                choices: getKeys(GeneratorType),
                message: "What would you like to generate?",
                name: "generatorType",
                type: "select",
            },
        ];

        /**
         * Acceptable atomic types
         *
         * @todo Ask for locationTypes
         *          Root (./src/components)
         *          App (./apps/{app}/src/components)
         *          Package (./package/{package}/src/components)
         *      Then if App or Package we need to search the first level dir an have them pick one
         * @todo The store one is only going to support root for now. It's not as widely used since the pattern isn't as well established.
         *
         */
        const askCreateComponentQuestions = [
            {
                choices: getKeys(AtomicDesignType),
                message: `What "type" of Atomic component is this?`,
                name: "componentAtomicType",
                type: "select",
            },
            {
                choices: getKeys(ProgrammingParadigm),
                message: "Is this a functional or classical component?",
                name: "componentParadigmType",
                type: "select",
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
        const askCreatePackageQuestions = [
            {
                message: "What is the name of the new package?",
                name: "packageName",
                type: "input",
                validate: Validation.minLength(1),
            },
            {
                message:
                    "Provide a package namespace if necessary (leave blank if not required):",
                name: "packageNameSpace",
                type: "input",
            },
            {
                message: "Provide a brief description of the package:",
                name: "packageDescription",
                type: "input",
                validate: Validation.minLength(1),
            },
            {
                message: "Provide a license type for the package:",
                name: "packageLicense",
                type: "input",
                validate: Validation.minLength(1),
            },
            {
                message: "Provide the author name:",
                name: "packageAuthorName",
                type: "input",
                validate: Validation.minLength(1),
            },
            {
                message: "Provide the author email:",
                name: "packageAuthorEmail",
                type: "input",
                validate: Validation.minLength(1),
            },
            {
                message:
                    "Provide a private registery if necessary(leave blank if not required):",
                name: "packageRegistry",
                type: "input",
            },
            {
                message:
                    "Provide an initial version to publish the package with:",
                name: "packageVersion",
                type: "input",
                validate: Validation.minLength(1),
            },
        ];
        const { generatorType } = (await prompt.ask<CreateOptions>(
            askCreateQuestions,
        )) as any;
        switch (generatorType) {
            case "App": {
                print.info("Coming Soon");
                break;
            }
            case "Component": {
                const options = (await prompt.ask<CreateComponentOptions>(
                    askCreateComponentQuestions,
                )) as any;
                createComponent(options);
                break;
            }
            case "Package": {
                const options = (await prompt.ask<CreatePackageOptions>(
                    askCreatePackageQuestions,
                )) as any;
                createPackage(options);
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
