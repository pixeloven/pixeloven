import path from "path";

/**
 * Load config file
 * @description Meant to load asset file
 * @param file
 * @return string
 */
export const importAsset = (file: string): void => {
    const remoteFile = path.resolve(process.cwd(), file);
    import(remoteFile).catch((error: Error) => {
        console.error(`Failed to load asset ${remoteFile}`, error.message);
    });
};
