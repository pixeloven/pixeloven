import { PixelOvenToolbox } from "../types";

export default {
    alias: ["--copy"],
    name: "copy",
    run: async (toolbox: PixelOvenToolbox) => {
        const { filesystem, parameters, pixelOven, print } = toolbox;

        switch (parameters.first) {
            case "ico":
                filesystem.copy("src", "dist/lib", {
                    matching: "**/*.ico",
                    overwrite: true,
                });
                print.success(`Successfully copied ico files to dist`);
                break;
            case "scss":
                filesystem.copy("src", "dist/lib", {
                    matching: "**/*.scss",
                    overwrite: true,
                });
                print.success(`Successfully copied scss files to dist`);
                break;
            case "svg":
                filesystem.copy("src", "dist/lib", {
                    matching: "**/*.svg",
                    overwrite: true,
                });
                print.success(`Successfully copied svg files to dist`);
                break;
            case "assets":
                filesystem.copy("src", "dist/lib", {
                    matching: "**/*.{ico,scss,svg}",
                    overwrite: true,
                });
                print.success(`Successfully copied assets to dist`);
                break;
            default:
                pixelOven.invalidArgument();
                break;
        }
    },
};
