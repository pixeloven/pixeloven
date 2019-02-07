import { PixelOvenRunContext } from "../types";

export default {
    alias: ["--delete"],
    name: "delete",
    run: async (context: PixelOvenRunContext) => {
        const { filesystem, parameters, pixeloven, print } = context;
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
                pixeloven.printInvalidArgument();
                break;
        }
    },
};
