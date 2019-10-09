import { AddonStorybookToolbox, StorybookExecutionOptionTypes, StorybookExecutionType } from "../types";

export default {
    alias: ["--story", "-s"],
    name: "story",
    run: async (toolbox: AddonStorybookToolbox) => {
        const { parameters, pixelOven, storybook } = toolbox;
        const task = parameters.first;
        if (!task) {
            pixelOven.invalidArgument("Must provide a task for Storybook to run.");
            pixelOven.exit("Storybook", 1);
            return;
        }
        if (!StorybookExecutionType.hasOwnProperty(task)) {
            pixelOven.invalidArgument(`Available Storybook tasks are "build" or "start".`, task);
            pixelOven.exit("Storybook", 1);
            return;
        }
        /**
         *  @todo: add "help" argument that prints available tasks and options
         */
        switch (task) {
            case "build":
            case "start": {
                Object.keys(parameters.options).forEach(option => {
                    if (!StorybookExecutionOptionTypes.hasOwnProperty(option)) {
                        pixelOven.invalidArgument(`Available options for "${task}" are "--outputDir", "--port", or "--noQuiet"`, `--${option}`);
                        pixelOven.exit("Storybook", 1);
                    }
                });
                const statusCode = await storybook(
                    StorybookExecutionType[task],
                    parameters.options
                );
                pixelOven.exit(
                    "Storybook",
                    statusCode,
                    `Success! Read me a story please.\n`,
                );
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
