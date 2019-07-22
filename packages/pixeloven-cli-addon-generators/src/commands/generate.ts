import { AddonGeneratorsToolbox } from "../types";

export default {
    alias: ["--generate", "-g"],
    name: "generate",
    run: async (toolbox: AddonGeneratorsToolbox) => {
        const { createComponent, prompt } = toolbox;

        /**
         * Starting generator type
         * @todo create CLI Addon, library, project generators
         */
        const askGeneratorType = {
            choices: ['component', 'package', "project"],
            message: 'What would you like to generate?',
            name: 'generatorType',
            type: 'select',
        };

        /**
         * Acceptable atomic types
         */
        const askComponentQuestions = [
            {
                choices: [
                    "atom",
                    "molecule",
                    "organism",
                    "page",
                    "partial",
                    "template",
                ],
                message: `What "type" of Atomic component is this?`,
                name: "componentAtomicType",
                type: "list",
            },
            {
                choices: ["function", "class"],
                message: "Is this a functional or class component?",
                name: "componentParadigmType",
                type: "list",
            },
            {
                default: true,
                message: "Will this component need to manage state? (Y/N)",
                name: "includeState",
                type: "confirm",
            },
            {
                default: true,
                message: "Will this component require a stylesheet? (Y/N)",
                name: "includeStyles",
                type: "confirm",
            },
            {
                message: "What is the name of the new component?",
                name: "componentName",
                type: "input",
                // validate: validateWord,
            },
            {
                message: "Provide a brief description of this component:",
                name: "componentDescription",
                type: "input",
                // validate: makeValidateMinLength(1),
            },
        ];
        
        /**
         * Ask for generator type
         */
        const { generatorType } = await prompt.ask([askGeneratorType])

        switch (generatorType) {
            case "component": {
                const {componentAtomicType, componentName} = await prompt.ask(askComponentQuestions);
                createComponent({
                    componentAtomicType,
                    componentName,
                });
            }
            default: {
                //
            }
        }

        // todo remove generator for state
        // todo create generator for library
        // todo crete generator for addon
        //

        // switch (parameters.first) {
        //     case "component"
        // }


        // const semicolon = toolbox.options.useSemicolons && ';'
      
        // await toolbox.template.generate({
        //   template: 'component.njk',
        //   target: `app/components/${name}-view.js`,
        //   props: { name, semicolon },
        // })
    },
};
