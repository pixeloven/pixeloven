import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--pretty", "-p"],
    name: "pretty",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, prettier, styleLint, tsLint } = context;
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
                print.success(`Success! Looks a lot nicer now doesn't it?!\n`);
            }
            return status;
        };
        /**
         * @todo if first is not in switch then we don't want to slice here
         */
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        const prettierResults = await prettier(argList);
        const prettierStatus = handle("Prettier", prettierResults.status);
        switch (parameters.first) {
            case "scss": {
                const results = await styleLint(["--fix"].concat(argList));
                return handle("Stylelint", results.status);
            }
            case "ts":
            case "tsx": {
                const results = await tsLint(["--fix"].concat(argList));
                return handle("TSLint", results.status);
            }
        }
        return prettierStatus;
    },
};
