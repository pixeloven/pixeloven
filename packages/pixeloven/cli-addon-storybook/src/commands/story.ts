import {
    AddonStorybookToolbox,
    StorybookExecutionOptionTypes,
    StorybookExecutionType,
} from "../types";

export default {
    name: "story",
    run: async (toolbox: AddonStorybookToolbox) => {
        let statusCode = 0;
        const { parameters, print, storybook } = toolbox;
        const task = parameters.first;
        if (!task) {
            print.error("Invalid argument no task provided.");
            print.info(`Available Storybook tasks are "build" or "start"`);
            process.exit(1);
        }
        if (!StorybookExecutionType.hasOwnProperty(task)) {
            print.error(`Invalid argument ${task}`);
            print.info(`Available Storybook tasks are "build" or "start"`);
            process.exit(1);
        }
        Object.keys(parameters.options).forEach(option => {
            if (!StorybookExecutionOptionTypes.hasOwnProperty(option)) {
                print.error(`Invalid argument --${option}`);
                print.info(
                    `Available options for "${task}" are "--output-dir", "--port", or "--quiet"`,
                );
                process.exit(1);
            }
        });
        /**
         *  @todo: add "help" argument that prints available tasks and options
         */
        switch (task) {
            case "build":
            case "start": {
                statusCode = await storybook(
                    StorybookExecutionType[task],
                    parameters.options,
                );
                break;
            }
        }
        if (statusCode > 0) {
            print.error(`Failed to ${task} storybook`);
        } else {
            print.success(`Success! Read me a story please.\n`);
        }
        process.exit(statusCode);
    },
};
