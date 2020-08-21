import { ErrorCode, AddonTsLintToolbox } from "../types";

const availableTasksString = `Available tasks are "css", "scss", "js", "jsx", "ts", or "tsx".`;

export default {
    description: "Project linter supporting typescript, scss and css",
    name: "lint",
    run: async (context: AddonTsLintToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, styleLint, tsLint } = context;
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
            switch (parameters.first) {
                case "css":
                case "scss": {
                    const results = await styleLint(argList);
                    statusCode = results.status;
                    break;
                }
                case "js":
                case "jsx":
                case "ts":
                case "tsx": {
                    const results = await tsLint(argList);
                    statusCode = results.status;
                    break;
                }
                default: {
                    print.error(`Invalid task: ${task}`);
                    print.info(availableTasksString);
                    statusCode = ErrorCode.InvalidArgument;
                    break;
                }
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
