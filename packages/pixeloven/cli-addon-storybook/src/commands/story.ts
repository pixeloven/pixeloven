import { AddonStorybookRunContext, StorybookExecutionType } from "../types";

export default {
    alias: ["--story", "-s"],
    name: "story",
    run: async (context: AddonStorybookRunContext) => {
        const { parameters, pixelOven, storybook } = context;
        if (!parameters.first) {
            pixelOven.invalidArgument("Must provide a story run type.");
            return;
        }
        if (!StorybookExecutionType.hasOwnProperty(parameters.first)) {
            pixelOven.invalidArgument("Invalid run type provided.");
            return;
        }
        switch (parameters.first) {
            case "build":
            case "start": {
                const argList = pixelOven.getArgList(
                    parameters.first,
                    parameters,
                    {
                        offset: 1,
                        type: "withOptions",
                    },
                );
                const statusCode = await storybook(
                    StorybookExecutionType[parameters.first],
                    argList,
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
