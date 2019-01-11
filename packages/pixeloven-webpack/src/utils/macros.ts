import fs from "fs";
import path from "path";

/**
 * Returns client code path
 */
export const clientPath = path.resolve(
    fs.realpathSync(process.cwd()),
    "./src/client",
);
export const hasClientCodePath = () => fs.existsSync(clientPath);

/**
 * Returns client code path
 */
export const serverPath = path.resolve(
    fs.realpathSync(process.cwd()),
    "./src/server",
);
export const hasServerCodePath = () => fs.existsSync(serverPath);