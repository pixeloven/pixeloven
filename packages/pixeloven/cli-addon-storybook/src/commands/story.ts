import { AddonStorybookToolbox, StorybookExecutionType } from "../types";

export default {
    alias: ["--story", "-s"],
    name: "story",
    run: async (toolbox: AddonStorybookToolbox) => {
        const { parameters, pixelOven, storybook } = toolbox;
        if (!parameters.first) {
            pixelOven.invalidArgument("Must provide a task for Storybook to run.");
            pixelOven.exit("Storybook", 1);
            return;
        }
        if (!StorybookExecutionType.hasOwnProperty(parameters.first)) {
            pixelOven.invalidArgument(`Available Storybook tasks are "build" or "start".`, `"${parameters.first}"`);
            pixelOven.exit("Storybook", 1);
            return;
        }

        switch (parameters.first) {
            case "build":
            case "start": {
                const statusCode = await storybook(
                    StorybookExecutionType[parameters.first],
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
