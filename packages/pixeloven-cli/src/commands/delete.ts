import { GluegunRunContext } from "gluegun";

export default {
    alias: ["--delete"],
    name: "delete",
    run: async (context: GluegunRunContext) => {
        const { filesystem, parameters, print } = context;
        switch(parameters.first) {
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
            default:
                print.error("Invalid arguments provided");
                print.info("Usage: (coverage|dist|docs)");
                break;
        }
    },
};
