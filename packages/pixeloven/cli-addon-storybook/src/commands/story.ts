import {
    AddonStorybookToolbox,
    StorybookExecutionOptionTypes,
    StorybookExecutionType,
} from "../types";

/**
 *  @todo: add "help" argument that prints available tasks and options
 */
export default {
    description: "Storybook addon",
    name: "story",
    run: async (toolbox: AddonStorybookToolbox) => {
        let statusCode = 0;
        const { parameters, print, storybook } = toolbox;
        const task = parameters.first;
        const invalidOptions = Object.keys(parameters.options).filter(
            option => !StorybookExecutionOptionTypes.hasOwnProperty(option),
        );
        if (!task) {
            print.error("Invalid argument no task provided.");
            print.info(`Available Storybook tasks are "build" or "start"`);
            statusCode = 1;
        } else if (!StorybookExecutionType.hasOwnProperty(task)) {
            print.error(`Invalid argument ${task}`);
            print.info(`Available Storybook tasks are "build" or "start"`);
            statusCode = 1;
        } else if (invalidOptions.length) {
            const error =
                invalidOptions.length === 1
                    ? `Invalid ${task} option --${invalidOptions[0]}`
                    : `Invalid ${task} options --${invalidOptions.join(" --")}`;
            print.error(error);
            print.info(
                `Available options for "${task}" are "--output-dir", "--port", or "--quiet"`,
            );
            statusCode = 1;
        } else {
            statusCode = await storybook(
                StorybookExecutionType[task],
                parameters.options,
            );
        }
        // We only want to exit if statusCode is 1 or greater
        if (statusCode) {
            process.exit(statusCode);
        }
    },
};
