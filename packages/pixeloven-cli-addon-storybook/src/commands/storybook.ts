import { GluegunRunContext } from "gluegun";

export default {
    name: "storybook",
    run: async (context: GluegunRunContext) => {
        const { parameters, print, storybook } = context;
        let statusCode = 0;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "build":
                statusCode = await storybook(argList);
                if (statusCode) {
                    print.error(`Storybook exited with status ${statusCode}`);
                } else {
                    print.success(`Success!`);
                }
                break;
            case "start":
                statusCode = await storybook(argList);
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
