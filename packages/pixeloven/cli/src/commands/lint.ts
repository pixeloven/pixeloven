import { PixelOvenToolbox } from "../types";

export default {
    name: "lint",
    run: async (context: PixelOvenToolbox) => {
        const { parameters, pixelOven, styleLint, tsLint } = context;
        const availableTasks = ["css", "scss", "ts", "tsx"];
        const task = parameters.first;

        if (!task) {
            pixelOven.invalidArgument("Please provide a task for Lint to run.");
            pixelOven.exit("Lint", 1);
        } else if (!availableTasks.includes(task)) {
            pixelOven.invalidArgument(
                `Available Pretty tasks are "css", "scss", "ts", or "tsx".`,
                task,
            );
            pixelOven.exit("Pretty", 1);
        } else {
            const argList = pixelOven.getArgList(task, parameters, {
                offset: 1,
                type: "withOptions",
            });

            switch (parameters.first) {
                case "css":
                case "scss": {
                    const results = await styleLint(argList);
                    pixelOven.exit(
                        "Stylelint",
                        results.status,
                        `Success! Your ${parameters.first} is beautify just the way it is.\n`,
                    );
                    break;
                }
                case "ts":
                case "tsx": {
                    const results = await tsLint(argList);
                    pixelOven.exit(
                        "TSLint",
                        results.status,
                        `Success! Your ${parameters.first} is beautify just the way it is.\n`,
                    );
                    break;
                }
                default: {
                    pixelOven.invalidArgument(
                        `Available Lint tasks are "css", "scss", "ts", or "tsx".`,
                        task,
                    );
                    pixelOven.exit("Lint", 1);
                    break;
                }
            }
        }
    },
};
