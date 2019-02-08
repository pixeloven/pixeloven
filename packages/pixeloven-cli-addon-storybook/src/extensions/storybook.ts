import { AddonStorybookRunContext } from "../types";

export type StorybookExecutionType = "build" | "start";

export type StorybookExtension = (type: StorybookExecutionType, args?: string[]) => Promise<number>;

export default (context: AddonStorybookRunContext) => {
    const storybook = async (type: StorybookExecutionType, args: string[] = []) => {
        const { filesystem, pixeloven } = context;
        const packagePath = require.resolve("@pixeloven/storybook");
        const configPath = filesystem.path(packagePath, "./config");
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
            default:
                throw new Error();
        }
    };
    context.storybook = storybook;
};
