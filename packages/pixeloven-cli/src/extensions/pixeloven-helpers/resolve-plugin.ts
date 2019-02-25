import fs from "fs";
import { filesystem } from "gluegun";
import { ResolvePluginFunction } from "../../types";

const resolvePlugin: ResolvePluginFunction = (...paths: string[]) => {
    const nodeModulesPath = filesystem.path(process.cwd(), "./node_modules");
    const plugin = filesystem.path(nodeModulesPath, ...paths);
    if (fs.existsSync(plugin)) {
        return filesystem.path(fs.realpathSync(plugin), "./dist/lib");
    }
    return false;
};

export default resolvePlugin;