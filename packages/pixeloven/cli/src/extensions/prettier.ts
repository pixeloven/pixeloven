import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox } from "../types";

const fileName = "prettier.json";

export default (context: PixelOvenToolbox) => {
    async function prettier(args: string[]) {
        const { print, pixelOven } = context;
        const configPath = resolvePath(fileName, false);
        const prettierArgs = ["prettier", "--write"];
        if (configPath) {
            prettierArgs.concat(["--config", configPath, ...args]);
        } else {
            prettierArgs.concat(args);
            print.warning(
                `Unable to find "${fileName}" reverting to default configuration`,
            );
        }
        const results = await pixelOven.run(
            ["prettier", "--write"].concat(args),
        );
        return results;
    }
    context.prettier = prettier;
};
