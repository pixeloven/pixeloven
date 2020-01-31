import { PixelOvenToolbox } from "../types";

export default {
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
                try {
                    if (
                        parameters.first &&
                        filesystem.exists(parameters.first)
                    ) {
                        const destPath = parameters.second || "dist/lib";
                        filesystem.copy(parameters.first, destPath, {
                            matching: parameters.third || "*",
                            overwrite: true,
                        });
                        if (parameters.third) {
                            print.success(
                                `Successfully copied contents of ${parameters.first} to ${destPath} matching ${parameters.third}`,
                            );
                        } else {
                            print.success(
                                `Successfully copied contents of ${parameters.first} to ${destPath}`,
                            );
                        }
                    } else {
                        pixelOven.invalidArgument();
                    }
                } catch (e) {
                    // to catch potential Error: EISDIR: illegal operation on a directory, open
                    print.error("Failed to copy with error: " + e);
                }
                break;
        }
    },
};
