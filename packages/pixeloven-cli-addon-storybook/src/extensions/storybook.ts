import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { AddonStorybookRunContext } from "../types";

export type StorybookExecutionType = "build" | "start";

export type StorybookExtension = (type: StorybookExecutionType, args?: string[]) => Promise<object>;

/**
 * @todo Add support for custom config path
 * @todo Need to clean this up - the cmd and this have similar logic that could be condensed
 * @todo This should really be two different extensions
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
                return pixeloven.run([
                    "build-storybook",
                    "-c",
                    configPath,
                    "-o",
                    "./dist/public/docs",
                ].concat(args));
            }
            case "start": {
                return pixeloven.run([
                    "start-storybook",
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
