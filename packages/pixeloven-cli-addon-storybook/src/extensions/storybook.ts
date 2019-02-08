import path from "path";
import { AddonStorybookRunContext } from "../types";

export type StorybookExecutionType = "build" | "start";

export type StorybookExtension = (type: StorybookExecutionType, args?: string[]) => Promise<number>;

export default (context: AddonStorybookRunContext) => {
    const storybook = async (type: StorybookExecutionType, args: string[] = []) => {
        const { pixeloven } = context;
        switch (type) {
            case "build": {
                const config = path.resolve(__dirname, "./configs");
                return pixeloven.runBin("build-storybook", [
                    "-c",
                    config,
                    "-o",
                    "./dist/public/docs",
                ].concat(args));
            }
            case "start": {
                const config = path.resolve(__dirname, "./configs");
                return pixeloven.runBin("start-storybook", [
                    "--quiet",
                    "--ci",
                    "-s",
                    "./public",
                    "-p",
                    "9001",
                    "-c",
                    config,
                ].concat(args));
            }
            default:
                throw new Error();
        }
    };
    context.storybook = storybook;
};
