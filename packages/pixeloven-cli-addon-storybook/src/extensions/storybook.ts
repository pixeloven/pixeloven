import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { AddonStorybookRunContext } from "../types";

export type StorybookExecutionType = "build" | "start";

export type StorybookExtension = (type: StorybookExecutionType, args?: string[]) => Promise<number>;

/**
 * @todo Add support for custom config path
 */
export default (context: AddonStorybookRunContext) => {
    const storybook = async (type: StorybookExecutionType, args: string[] = []) => {
        const { filesystem, pixeloven} = context;
        const pluginPath = pixeloven.resolvePlugin("@pixeloven", "storybook");
        if (!pluginPath) {
            throw new Error("Could not find peer dependency @pixeloven/storybook");
        }
        const configPath = filesystem.path(pluginPath, "./config");

        switch (type) {
            case "build": {
                return pixeloven.runBin("build-storybook", [
                    "-c",
                    configPath,
                    "-o",
                    "./dist/public/docs",
                ].concat(args));
            }
            case "start": {
                return pixeloven.runBin("start-storybook", [
                    "--quiet",
                    "--ci",
                    "-s",
                    "./public",
                    "-p",
                    "9001",
                    "-c",
                    configPath,
                ].concat(args));
            }
            default: {
                throw new NodeInvalidArgumentException();
            }
        }
    };
    context.storybook = storybook;
};
