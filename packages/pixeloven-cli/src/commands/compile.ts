import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--compile", "-c"],
    name: "compile",
    run: async (context: PixelOvenRunContext) => {
        const { parameters, print, tsc } = context;
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
                    `Success! Beam me up.`,
                );
            }
            return status;
        }
        switch (parameters.first) {
            case "ts":
            case "tsx": {
                const argList = parameters.argv && parameters.argv.length 
                    ? parameters.argv.slice(4)
                    : [];
                const results = await tsc(argList);
                return handle("Tsc", results.status);
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
