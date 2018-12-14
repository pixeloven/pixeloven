import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

/**
 * Find static files
 * @param publicPath
 * @param baseUrl
 * @param type
 */
export const findStaticFiles = (
    publicPath: string,
    baseUrl: string,
    type: string,
) =>
    fs
        .readdirSync(`${publicPath}/static/${type}`)
        .filter(fn => fn.endsWith(`.${type}`))
        .map(file => path.normalize(`${baseUrl}/static/${type}/${file}`));

/**
 * Define assets for template
 * @todo CA-104 Get from manifest or pass in at build time.
 */
export default (publicPath: string, baseUrl: string) => {
    if (!fs.existsSync(publicPath)) {
        return (req: Request, res: Response, next: NextFunction): void => {
            next();
        };
    }

    const cssFiles = findStaticFiles(publicPath, baseUrl, "css");
    const jsFiles = findStaticFiles(publicPath, baseUrl, "js");

    /**
     * Provides middleware to map files onto the request object
     */
    return (req: Request, res: Response, next: NextFunction): void => {
        req.files = {
            css: cssFiles,
            js: jsFiles,
        };
        next();
    };
};
