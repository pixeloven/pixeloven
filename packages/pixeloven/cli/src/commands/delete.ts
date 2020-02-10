import { PixelOvenToolbox } from "../types";

export default {
    description: "Delete specific targeted build directories",
    name: "delete",
    run: async (toolbox: PixelOvenToolbox) => {
        let statusCode = 0;
        const { filesystem, parameters, print } = toolbox;
        switch (parameters.first) {
            case "coverage":
                filesystem.remove("./coverage");
                print.success(`Successfully deleted directory`);
                break;
            case "dist":
                filesystem.remove("./dist");
                print.success(`Successfully deleted directory`);
                break;
            case "docs":
                filesystem.remove("./docs");
                print.success(`Successfully deleted directory`);
                break;
            case "stats":
                filesystem.remove("./stats");
                print.success(`Successfully deleted directory`);
                break;
            case "stories":
                filesystem.remove("./stories");
                print.success(`Successfully deleted directory`);
                break;
            default: {
                print.error(`Invalid argument provided`);
                statusCode = 1;
                break;
            }
        }
        process.exit(statusCode);
    },
};
