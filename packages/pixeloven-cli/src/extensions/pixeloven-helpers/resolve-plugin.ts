import fs from "fs";
import { filesystem } from "gluegun";

export type ResolvePluginFunction = (
    ...paths: string[]
) => string | false;

export default (...paths: string[]) => {
    const nodeModulesPath = filesystem.path(process.cwd(), "./node_modules");
    const plugin = filesystem.path(nodeModulesPath, ...paths);
    return filesystem.path(fs.realpathSync(plugin), "./dist/lib");
};
