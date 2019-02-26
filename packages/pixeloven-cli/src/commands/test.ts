import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--test", "-t"],
    name: "test",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, jest } = context;
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
                print.success(`Success! Untouchable.`);
            }
            return status;
        };
        const argList =
            parameters.argv && parameters.argv.length
                ? parameters.argv.slice(4)
                : [];
        switch (parameters.first) {
            case "watch": {
                const results = await jest(["--watch"].concat(argList));
                return handle("Jest", results.status);
            }
            default: {
                const results = await jest(argList);
                return handle("Jest", results.status);
            }
        }
    },
};
