import fs from "fs";
import { filesystem } from "gluegun";

function resolvePlugin(...paths: string[]) {
    const nodeModulesPath = filesystem.path(process.cwd(), "./node_modules");
    const plugin = filesystem.path(nodeModulesPath, ...paths);
    if (fs.existsSync(plugin)) {
        return filesystem.path(fs.realpathSync(plugin), "./dist/lib");
    }
    return false;
}

export default resolvePlugin;
