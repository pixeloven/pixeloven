import { ErrorCode, PixelOvenToolbox } from "../types";

export default {
    name: "lint",
    run: async (context: PixelOvenToolbox) => {
        let statusCode = 0;
        const { parameters, pixelOven, print, styleLint, tsLint } = context;
        const task = parameters.first;

        if (!task) {
            print.error(`Missing task`);
            print.info(`Available  tasks are "css", "scss", "ts", or "tsx".`);
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
                case "ts":
                case "tsx": {
                    const results = await tsLint(argList);
                    statusCode = results.status;
                    break;
                }
                default: {
                    print.error(`Invalid argument ${task}`);
                    print.info(
                        `Available Lint tasks are "css", "scss", "ts", or "tsx".`,
                    );
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
