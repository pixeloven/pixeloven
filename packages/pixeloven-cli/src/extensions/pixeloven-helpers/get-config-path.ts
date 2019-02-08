import { FileNotFoundException } from "@pixeloven/exceptions";
import { filesystem } from "gluegun";

export type GetConfigPathFunction = (fileName: string, strict?: boolean) => string | false;

export default (fileName: string, strict: boolean = false) => {
    const configPath = filesystem.path(fileName);
    if (filesystem.exists(configPath)) {
        return configPath;
    }
    if (strict) {
        throw new FileNotFoundException(`File not found ${configPath}`);
    }
    return false;
}