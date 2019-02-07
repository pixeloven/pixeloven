import { PixelOvenRunContext } from "../types";

/**
 * @todo Move to extensions eventually
 * @param context 
 */

/**
 * @todo Need to handle errors better!
 */
export default {
    alias: ["--pretty", "-p"],
    name: "pretty",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, pixeloven, prettier, styleLint, tsLint } = context;
        /**
         * @todo Need to handle base case where only "pretty"
         * @todo move this to helper
         * @todo also need to validate -- hard to do
         * @todo Also need to intelligently handle file lists and globs so they match up tot he proper call.
         */
        const argList = parameters.array && parameters.array.length ? parameters.array.slice(1) : [];
        switch(parameters.first) {
            case "scss": 
                styleLint(["--fix"].concat(argList));
                prettier(argList);
                print.success(`Looks a lot nicer now doesn't it?!`);
                break;
            case "ts":
            case "tsx":
                tsLint(["--fix"].concat(argList));
                prettier(argList);
                print.success(`What nice TypeScript you have!`);
                break;
            default:
                pixeloven.printInvalidArgument();
                break;
        }
    },
};
