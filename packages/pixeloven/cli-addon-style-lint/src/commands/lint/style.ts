import { ErrorCode, AddonStyleLintToolbox } from "../../types";

const availableTasksString = `Available tasks are "css" and "scss"`;

export default {
    description: "Project linter supporting scss and css",
    name: "style",
    run: async (context: AddonStyleLintToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, styleLint } = context;
        const task = parameters.first;
        if (!task) {
            print.error(`Missing task`);
            print.info(availableTasksString);
            statusCode = ErrorCode.MissingTask;
        } else {
            const argList = pixelOven.getArgList(task, parameters, {
                offset: 1,
                type: "withOptions",
            });
            const results = await styleLint(argList);
            statusCode = results.status;
        }
        if (!statusCode) {
            print.success(
                `Success! Your ${parameters.first} is beautify just the way it is.\n`,
            );
        }
        process.exit(statusCode);
    },
};
