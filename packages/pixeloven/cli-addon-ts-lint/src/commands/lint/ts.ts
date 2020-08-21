import { ErrorCode, AddonTsLintToolbox } from "../../types";

const availableTasksString = `Available tasks are "js", "jsx", "ts", or "tsx".`;

export default {
    description: "Project linter supporting TypeScript",
    name: "ts",
    run: async (context: AddonTsLintToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, tsLint } = context;
        const task = parameters.first;
        print.info("HIIIII");
        if (!task) {
            print.error(`Missing task`);
            print.info(availableTasksString);
            statusCode = ErrorCode.MissingTask;
        } else {
            const argList = pixelOven.getArgList(task, parameters, {
                offset: 1,
                type: "withOptions",
            });
            const results = await tsLint(argList);
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
