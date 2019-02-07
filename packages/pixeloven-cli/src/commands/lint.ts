import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--lint", "-l"],
    name: "lint",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, pixeloven, styleLint, tsLint } = context;
        /**
         * @todo Need to handle base case where only "lint"
         * @todo move this to helper
         * @todo also need to validate -- hard to do
         * @todo Also need to intelligently handle file lists and globs so they match up tot he proper call.
         */
        const argList = parameters.array && parameters.array.length ? parameters.array.slice(1) : [];
        switch(parameters.first) {
            case "scss": 
                styleLint(argList);
                print.success(`Success! Your code is beautify just the way it is.`);
                break;
            case "ts":
            case "tsx":
                tsLint(argList);
                print.success(`Success! Your code is beautify just the way it is.`);
                break;
            default:
                pixeloven.printInvalidArgument();
                break;
        }
    },
};
