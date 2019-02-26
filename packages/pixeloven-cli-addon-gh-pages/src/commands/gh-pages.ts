import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { AddonGhPagesRunContext } from "../types";

export default {
    name: "gh-pages",
    run: async (context: AddonGhPagesRunContext) => {
        const { parameters, print, ghPages } = context;
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
                print.success(`Success!`);
            }
            return status;
        };
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "build": {
                const results = await ghPages(argList);
                return handle("Storybook", results.status);
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
