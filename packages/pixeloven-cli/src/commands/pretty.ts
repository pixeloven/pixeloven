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
                print.error(`${name} exited with status ${status}`);
                process.exit(status);
            } else {
                print.success(
                    `Success! Looks a lot nicer now doesn't it?!`,
                );
            }
            return status;
        }
        /**
         * Always run prettier
         */
        const argList = parameters.argv && parameters.argv.length 
            ? parameters.argv.slice(3)
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
