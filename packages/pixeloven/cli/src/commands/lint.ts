import { PixelOvenToolbox } from "../types";

export default {
    name: "lint",
    run: async (context: PixelOvenToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, styleLint, tsLint } = context;
        const availableTasks = ["css", "scss", "ts", "tsx"];
        const task = parameters.first;

        if (!task) {
            print.error(`Missing task`);
            print.error(`Available  tasks are "css", "scss", "ts", or "tsx".`);
            process.exit(1);
        }
        if (!availableTasks.includes(task)) {
            print.error(`Invalid argument ${task}`);
            print.error(
                `Available Lint tasks are "css", "scss", "ts", or "tsx".`,
            );
            process.exit(1);
        }
        const argList = pixelOven.getArgList(task, parameters, {
            offset: 1,
            type: "withOptions",
        });

        switch (parameters.first) {
            case "css":
            case "scss": {
                const results = await styleLint(argList);
                statusCode = results.status;
                break;
            }
            case "ts":
            case "tsx": {
                const results = await tsLint(argList);
                statusCode = results.status;
                break;
            }
            default: {
                print.error(`Invalid argument ${task}`);
                print.error(
                    `Available Lint tasks are "css", "scss", "ts", or "tsx".`,
                );
                statusCode = 1;
                break;
            }
        }
        if (!statusCode) {
            print.success(
                `Success! Your ${parameters.first} is beautify just the way it is.\n`,
            );
        }
        process.exit(statusCode);
    },
};
