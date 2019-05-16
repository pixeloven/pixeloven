import { PixelOvenToolbox } from "../types";

export default {
    alias: ["--delete"],
    name: "delete",
    run: async (toolbox: PixelOvenToolbox) => {
        const { filesystem, pixelOven, parameters, print } = toolbox;
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
            default:
                pixelOven.invalidArgument();
                break;
        }
    },
};
