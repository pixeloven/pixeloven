import { PixelOvenCoreToolbox } from "../types";

export default {
    description: "Copy files from source to destination",
    name: "copy",
    run: async (toolbox: PixelOvenCoreToolbox) => {
        let statusCode = 0;
        const { filesystem, parameters, print } = toolbox;
        switch (parameters.first) {
            case "ico":
                filesystem.copy("src", "dist/lib", {
                    matching: "**/*.ico",
                    overwrite: true,
                });
                print.success(`Successfully copied ico files to dist`);
                break;
            case "images":
                filesystem.copy("src", "dist/lib", {
                    matching: "**/*.{jpg,jpeg,png,svg}",
                    overwrite: true,
                });
                print.success(`Successfully copied image files to dist`);
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
                    matching: "**/*.{ico,jpg,jpeg,png,scss,svg}",
                    overwrite: true,
                });
                print.success(`Successfully copied assets to dist`);
                break;
            default: {
                if (parameters.first && filesystem.exists(parameters.first)) {
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
                    print.error(`Invalid argument provided`);
                    statusCode = 1;
                }
                break;
            }
        }
        process.exit(statusCode);
    },
};
