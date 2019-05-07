import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--lint", "-l"],
    name: "lint",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, pixelOven, print, styleLint, tsLint } = context;
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
        switch (parameters.first) {
            case "scss": {
                const argList = pixelOven.getArgList("scss", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await styleLint(argList);
                return handle("Stylelint", results.status);
            }
            case "ts": {
                const argList = pixelOven.getArgList("ts", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await tsLint(argList);
                return handle("TSLint", results.status);
            }
            case "tsx": {
                const argList = pixelOven.getArgList("tsx", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const results = await tsLint(argList);
                return handle("TSLint", results.status);
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
