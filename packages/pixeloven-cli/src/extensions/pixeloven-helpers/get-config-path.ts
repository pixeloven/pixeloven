import { filesystem } from "gluegun";

export type GetConfigPathFunction = (fileName: string) => string | false;

export default (fileName: string) => {
    const configPath = filesystem.path(fileName);
    if (filesystem.exists(configPath)) {
        return configPath;
    }
    return false;
}