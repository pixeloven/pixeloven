import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--lint", "-l"],
    name: "lint",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, pixeloven, styleLint, tsLint } = context;
        let statusCode = 0;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "scss":
                statusCode = await styleLint(argList);
                if (statusCode) {
                    print.error(`Stylelint exited with status ${statusCode}`);
                } else {
                    print.success(
                        `Success! Your code is beautify just the way it is.`,
                    );
                }
                break;
            case "ts":
            case "tsx":
                statusCode = await tsLint(argList);
                if (statusCode) {
                    print.error(`TSLint exited with status ${statusCode}`);
                } else {
                    print.success(
                        `Success! Your code is beautify just the way it is.`,
                    );
                }
                break;
            default:
                pixeloven.printInvalidArgument();
                break;
        }
    },
};
