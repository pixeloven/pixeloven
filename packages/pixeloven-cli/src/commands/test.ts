import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--test", "-t"],
    name: "test",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, pixelOven, print, jest } = context;
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
                print.success(`Success! Untouchable.\n`);
            }
            return status;
        };
        switch (parameters.first) {
            case "watch": {
                const argList = pixelOven.getArgList(
                    "watch",
                    parameters,
                    {
                        offset: 1,
                        type: "withOptions"
                    },
                );
                const results = await jest(["--watch"].concat(argList));
                return handle("Jest", results.status);
            }
            default: {
                const argList = pixelOven.getArgList(
                    "test",
                    parameters,
                    {
                        offset: 0,
                        type: "withOptions"
                    },
                );
                const results = await jest(argList);
                return handle("Jest", results.status);
            }
        }
    },
};
