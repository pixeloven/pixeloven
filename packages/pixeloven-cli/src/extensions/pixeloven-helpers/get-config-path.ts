import { filesystem, print } from "gluegun";

export type GetConfigPathFunction = (fileName: string) => string | undefined;

export default (fileName: string) => {
    const configPath = filesystem.path(fileName);
    if (filesystem.exists(configPath)) {
        return configPath;
    }
    print.warning(`Unable to find "${fileName}" reverting to default configuration`);
    return;
}