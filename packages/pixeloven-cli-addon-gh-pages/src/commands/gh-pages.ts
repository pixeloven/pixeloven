import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { AddonGhPagesRunContext } from "../types";

export default {
    name: "gh-pages",
    run: async (context: AddonGhPagesRunContext) => {
        const { parameters, print, storybook } = context;
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
                print.success(`Success! Read me a story please!!`);
            }
            return status;
        };
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "build":
            case "start": {
                const results = await storybook(parameters.first, argList);
                return handle("Storybook", results.status);
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    },
};
