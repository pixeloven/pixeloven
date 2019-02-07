import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--pretty", "-p"],
    name: "pretty",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, prettier, styleLint, tsLint } = context;
        /**
         * @todo Need to handle base case where only "pretty"
         * @todo move this to helper
         * @todo also need to validate -- hard to do
         * @todo Also need to intelligently handle file lists and globs so they match up tot he proper call.
         */
        let statusCode = 0;
        const argList = parameters.array && parameters.array.length ? parameters.array.slice(1) : [];
        switch(parameters.first) {
            case "scss":
                statusCode = await styleLint(["--fix"].concat(argList));
                if (statusCode) {
                    print.error(`Stylelint exited with status ${statusCode}`);
                    break;
                }
                statusCode = await prettier(argList);
                if (statusCode) {
                    print.error(`Prettier exited with status ${statusCode}`);
                    break;
                }
                print.success(`Success! Looks a lot nicer now doesn't it?!`);
                break;
            case "ts":
            case "tsx":
                statusCode = await tsLint(["--fix"].concat(argList));
                if (statusCode) {
                    print.error(`Tslint exited with status ${statusCode}`);
                    break;
                }
                statusCode = await prettier(argList);
                if (statusCode) {
                    print.error(`Prettier exited with status ${statusCode}`);
                    break;
                }
                print.success(`Success! Looks a lot nicer now doesn't it?!`);
                break;
            default:
                prettier(argList);
                break;
        }
    },
};
