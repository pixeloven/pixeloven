import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--lint", "-l"],
    name: "lint",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, pixeloven, styleLint, tsLint } = context;
        let statusCode = 0;
        switch (parameters.first) {
            case "scss": {
                const argList = parameters.argv && parameters.argv.length 
                    ? parameters.argv.slice(4)
                    : [];
                statusCode = await styleLint(argList);
                if (statusCode) {
                    print.error(`Stylelint exited with status ${statusCode}`);
                } else {
                    print.success(
                        `Success! Your code is beautify just the way it is.`,
                    );
                }
                return statusCode
            }
            case "ts":
            case "tsx": {
                const argList = parameters.argv && parameters.argv.length 
                    ? parameters.argv.slice(4)
                    : [];
                statusCode = await tsLint(argList);
                if (statusCode) {
                    print.error(`TSLint exited with status ${statusCode}`);
                } else {
                    print.success(
                        `Success! Your code is beautify just the way it is.`,
                    );
                }
                return statusCode;
            }
            default:
                pixeloven.printInvalidArgument();
        }
        return 1;
    },
};
