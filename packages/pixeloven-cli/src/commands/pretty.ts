import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--pretty", "-p"],
    name: "pretty",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, pixelOven, print, prettier, styleLint, tsLint } = context;
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
                print.success(`\nSuccess! Looks a lot nicer now doesn't it?!\n`);
            }
            return status;
        };



        switch (parameters.first) {
            case "scss": {
                const argList = pixelOven.getArgList("scss", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const prettierResults = await prettier(argList);
                const prettierStatus = handle("Prettier", prettierResults.status);

                const styleLintResults = await styleLint(["--fix"].concat(argList));
                const styleLintStatus = handle("Stylelint", styleLintResults.status);
                return prettierStatus + styleLintStatus;
            }
            case "ts": {
                const argList = pixelOven.getArgList("ts", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const prettierResults = await prettier(argList);
                const prettierStatus = handle("Prettier", prettierResults.status);

                const tsLintResults = await tsLint(["--fix"].concat(argList));
                const tsLintStatus = handle("TSLint", tsLintResults.status);
                return prettierStatus + tsLintStatus;
            }
            case "tsx": {
                const argList = pixelOven.getArgList("tsx", parameters, {
                    offset: 1,
                    type: "withOptions",
                });
                const prettierResults = await prettier(argList);
                const prettierStatus = handle("Prettier", prettierResults.status);

                const tsLintResults = await tsLint(["--fix"].concat(argList));
                const tsLintStatus = handle("TSLint", tsLintResults.status);
                return prettierStatus + tsLintStatus;
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
