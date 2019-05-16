import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { PixelOvenToolbox } from "../types";

export default {
    alias: ["--document"],
    name: "document",
    run: async (context: PixelOvenToolbox) => {
        const { parameters, print, typeDoc } = context;
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
                print.success(`Success! What's up doc(s)?\n`);
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
                const results = await typeDoc(argList);
                return handle("TypeDoc", results.status);
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
