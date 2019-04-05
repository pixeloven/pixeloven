import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { AddonStorybookRunContext } from "../types";

/**
 * @todo finish porting webpack and storybook
 * @todo document new CLI and all packages
 * @todo remove the need for .env for the CLI (use only in project and examples)
 * @todo I'd also like to make it so the @env package can load without a file being present at all.
 */
export default {
    alias: ["--story", "-s"],
    name: "story",
    run: async (context: AddonStorybookRunContext) => {
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
                print.success(`Success! Read me a story please.`);
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
