import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox } from "../types";

const fileName = "prettier.json";

export default (context: PixelOvenToolbox) => {
    async function prettier(args: string[]) {
        const { print, pixelOven } = context;
        const configPath = resolvePath(fileName, false);
        let prettierArgs = ["prettier", "--write"];
        if (configPath) {
            prettierArgs = prettierArgs.concat([
                "--config",
                configPath,
                ...args,
            ]);
        } else {
            prettierArgs = prettierArgs.concat(args);
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
        }
        const results = await pixelOven.run(prettierArgs);
        return results;
    }
    context.prettier = prettier;
};
