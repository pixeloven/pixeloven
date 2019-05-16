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
        const { parameters, pixelOven, storybook } = context;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "build":
            case "start": {
                const results = await storybook(parameters.first, argList);
                pixelOven.exit("Github Pages", results.status, `Success! Read me a story please.\n`);
                break;
            }
            default: {
                pixelOven.invalidArgument();
                break;
            }
        }
    },
};
