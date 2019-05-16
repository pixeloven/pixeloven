import { PixelOvenToolbox } from "../types";

export default {
    alias: ["--compile", "-c"],
    name: "compile",
    run: async (toolbox: PixelOvenToolbox) => {
        const { parameters, print, tsc } = toolbox;
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
                print.success(`Success! Beam me up.\n`);
            }
            return status;
        };
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "ts":
            case "tsx": {
                const results = await tsc(argList);
                handle("Tsc", results.status);
                break;
            }
            default: {
                print.error("Invalid argument provided");
                print.info("Run --help for more details");
                break;
            }
        }
    },
};
