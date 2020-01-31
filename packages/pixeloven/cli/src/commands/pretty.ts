import { PixelOvenToolbox } from "../types";

export default {
    name: "pretty",
    run: async (context: PixelOvenToolbox) => {
        let statusCode = 0;
        const {
            parameters,
            pixelOven,
            print,
            prettier,
            styleLint,
            tsLint,
        } = context;
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

        const prettierResults = await prettier(argList);
        statusCode = prettierResults.status;
        if (statusCode) {
            process.exit(statusCode);
        }
        switch (parameters.first) {
            case "css":
            case "scss": {
                const results = await styleLint(["--fix"].concat(argList));
                statusCode = results.status;
                break;
            }
            case "ts":
            case "tsx": {
                const results = await tsLint(["--fix"].concat(argList));
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
            print.success(`\nSuccess! Looks a lot nicer now doesn't it?!\n`);
        }
        process.exit(statusCode);
    },
};
