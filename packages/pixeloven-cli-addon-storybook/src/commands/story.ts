import { AddonStorybookRunContext } from "../types";

/**
 * @todo finish porting webpack and storybook
 * @todo document new CLI and all packages
 * @todo remove the need for .env for the CLI (use only in project and examples)
 * @todo I'd also like to make it so the @env package can load without a file being present at all.
 */
export default {
    name: "storybook",
    run: async (context: AddonStorybookRunContext) => {
        const { parameters, print, storybook } = context;
        let statusCode = 0;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "build":
                statusCode = await storybook(parameters.first, argList);
                if (statusCode) {
                    print.error(`Storybook exited with status ${statusCode}`);
                } else {
                    print.success(`Success!`);
                }
                break;
            case "start":
                statusCode = await storybook(parameters.first, argList);
                if (statusCode) {
                    print.error(`Storybook exited with status ${statusCode}`);
                } else {
                    print.success(`Success!`);
                }
                break;
            default:
                print.error("Invalid argument provided");
                print.info("Run --help for more details");
                break;
        }
    },
};
