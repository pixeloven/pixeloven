import { resolvePath } from "@pixeloven-core/filesystem";
import { PixelOvenToolbox, PrettierExtension } from "../types";

const fileName = "prettier.json";

export default (context: PixelOvenToolbox) => {
    const prettier: PrettierExtension = async (args: string[] = []) => {
        const { print, pixelOven } = context;
        const configPath = resolvePath(fileName, false);
        if (configPath) {
            return pixelOven.run(
                ["prettier", "--write", "--config", configPath].concat(args),
            );
        }
        print.warning(
            `Unable to find "${fileName}" reverting to default configuration`,
        );
        return pixelOven.run(["prettier", "--write"].concat(args));
    };
    context.prettier = prettier;
};
