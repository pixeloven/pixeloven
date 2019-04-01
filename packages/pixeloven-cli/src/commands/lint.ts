import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { PixelOvenRunContext } from "../types";

/**
 * @todo Spawn doesn't show output :(
 * @todo still need to process exit... think we might just use home backed solution for now.
 */
export default {
    alias: ["--lint", "-l"],
    name: "lint",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, styleLint, tsLint } = context;
        /**
         * Process results
         * @param name
         * @param status
         */
        const handle = (name: string, status: number) => {
            if (status) {
                print.error(`${name} exited with status ${status}\n`);
                process.exit(status);
            } else {
                print.success(
                    `Success! Your code is beautify just the way it is.\n`,
                );
            }
            return status;
        };

        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "scss": {
                const results = await styleLint(argList);
                return handle("Stylelint", results.status);
            }
            case "ts":
            case "tsx": {
                const results = await tsLint(argList);
                return handle("TSLint", results.status);
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
