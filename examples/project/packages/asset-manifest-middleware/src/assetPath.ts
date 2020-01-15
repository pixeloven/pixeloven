import {NextFunction, Request, Response} from "express";
import {AssetManifest} from "./AssetManifest";

/**
 * Define assets for template
 */
export default (publicPath: string, fileName: string) => {
    const asset = new AssetManifest({
        fileName,
        publicPath,
    });
    return (req: Request, res: Response, next: NextFunction): void => {
        if (asset.manifest) {
            req.files = asset.manifest;
        }
        next();
    };
};
