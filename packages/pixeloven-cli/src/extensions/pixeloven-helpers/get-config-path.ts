import { FileNotFoundException } from "@pixeloven/exceptions";
import { filesystem, print } from "gluegun";

export type GetConfigPathFunction = (
    fileName: string,
    strict?: boolean,
) => string | false;

/**
 * @todo add options to configure how this works
 */
export default (fileName: string, strict: boolean = false) => {
    const configPath = filesystem.path(fileName);
    if (filesystem.exists(configPath)) {
        print.info(`Configuration file found ${configPath}`);
        return configPath;
    }
    if (strict) {
        throw new FileNotFoundException(`File not found ${configPath}`);
    } else {
        print.warning(
            `Unable to find "${fileName}" reverting to default configuration`,
        );
    }
    return false;
};
