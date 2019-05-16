import fs from "fs";
import { filesystem } from "gluegun";

export const nodeModulesPath = "./node_modules";
export const distPath = "./dist/lib";

function resolvePlugin(...paths: string[]) {
    const plugin = filesystem.path(process.cwd(), nodeModulesPath, ...paths);
    if (fs.existsSync(plugin)) {
        const realPath = fs.realpathSync(plugin);
        return filesystem.path(realPath, distPath);
    }
    return false;
}

export default resolvePlugin;
