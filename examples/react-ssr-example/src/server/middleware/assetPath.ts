import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

interface Manifest {
    [key: string]: string;
}

/**
 * Reads asset manifest file
 * @param publicPath
 */
const requireAssetManifest = (publicPath: string): Manifest | undefined => {
    const manifestPath = path.normalize(`${publicPath}/asset-manifest.json`);
    if (fs.existsSync(manifestPath)) {
        return JSON.parse(fs.readFileSync("asset-manifest.json", "utf8"));
    }
    return undefined;
};

/**
 * Find static files
 * @param publicPath
 * @param baseUrl
 * @param type
 */
export const findStaticFiles = (manifest: Manifest, type: string) => {
    const results: string[] = [];
    for (const key in manifest) {
        if (manifest.hasOwnProperty(key)) {
            if (key.endsWith(`.${type}`)) {
                results.push(manifest[key]);
            }
        }
    }
    return results;
};

/**
 * Define assets for template
 */
export default (publicPath: string) => {
    const manifest = requireAssetManifest(publicPath);
    if (manifest) {
        return (req: Request, res: Response, next: NextFunction): void => {
            req.files = {
                css: findStaticFiles(manifest, "css"),
                js: findStaticFiles(manifest, "js"),
            };
            next();
        };
    }
    return (req: Request, res: Response, next: NextFunction): void => {
        next();
    };
};
