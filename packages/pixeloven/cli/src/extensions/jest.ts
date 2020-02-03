import { resolvePath } from "@pixeloven-core/filesystem";
import { JestExtension, PixelOvenToolbox } from "../types";

const fileName = "jest.json";

/**
 * @todo Can we import and use jest as a library instead of running it's CLI?
 */
export default (context: PixelOvenToolbox) => {
    const jest: JestExtension = async (args: string[] = []) => {
        const { print, pixelOven } = context;
        const configPath = resolvePath(fileName, false);
        const cmd = ["jest"];
        if (configPath) {
            return pixelOven.run(
                cmd.concat(["--config", configPath]).concat(args),
            );
        }
        print.warning(
            `Unable to find "${fileName}" reverting to default configuration`,
        );
        return pixelOven.run(cmd.concat(args));
    };
    context.jest = jest;
};
