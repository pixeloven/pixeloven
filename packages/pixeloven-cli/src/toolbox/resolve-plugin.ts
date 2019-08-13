import fs from "fs";
import { filesystem } from "gluegun";

export const nodeModulesPath = "./node_modules";
export const distPath = "./dist/lib";

/**
 * Exported for testing purposes
 * @param path
 */
export function fsExists(path: fs.PathLike) {
    return fs.existsSync(path);
}

/**
 * Resolves plugin path
 * @param paths
 */
function resolvePlugin(...paths: string[]) {
    const callerPath = filesystem.path(
        process.cwd(),
        nodeModulesPath,
        ...paths,
    );
    if (fsExists(callerPath)) {
        const realPath = fs.realpathSync(callerPath);
        return filesystem.path(realPath, distPath);
    }
    const scriptPath = filesystem.path(
        __dirname,
        "../../../", // Back out of cli/dist/lib
        ...paths,
    );
    if (fsExists(scriptPath)) {
        const realPath = fs.realpathSync(scriptPath);
        return filesystem.path(realPath, distPath);
    }
    return false;
}

export default resolvePlugin;
