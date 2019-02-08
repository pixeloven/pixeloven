import { GluegunRunContext } from "gluegun";

export default {
    name: "webpack",
    run: async (context: GluegunRunContext) => {
        const { parameters, print, webpack } = context;
        let statusCode = 0;
        const argList =
            parameters.array && parameters.array.length
                ? parameters.array.slice(1)
                : [];
        switch (parameters.first) {
            case "build":
                statusCode = await webpack(argList);
                if (statusCode) {
                    print.error(`Webpack exited with status ${statusCode}`);
                } else {
                    print.success(`Success!`);
                }
                break;
            case "start":
                statusCode = await webpack(argList);
                if (statusCode) {
                    print.error(`Webpack exited with status ${statusCode}`);
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