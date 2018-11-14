import path from "path";

/**
 * Load local config file
 * @description Meant to load asset file
 * @param file
 * @return void
 */
export const importLocalAsset = (file: string): void => {
    const localFile = path.resolve(__dirname, file);
    import(localFile).catch((error: Error) => {
        console.error(`Failed to load local asset ${localFile}`, error.message);
    });
};

/**
 * Load remote config file
 * @description Meant to load asset file
 * @param file
 * @return void
 */
export const importRemoteAsset = (file: string): void => {
    const remoteFile = path.resolve(process.cwd(), file);
    import(remoteFile).catch((error: Error) => {
        console.error(
            `Failed to load remote asset ${remoteFile}`,
            error.message,
        );
    });
};

/**
 * Resolves share component path
 * @todo Should make this configurable
 */
export const resolveSharedComponents = (): string =>
    path.resolve(process.cwd(), "./src/shared/components");

/**
 * Resolves tsconfig path
 * @todo Should make this configurable
 */
export const resolveTsConfig = (): string =>
    path.resolve(process.cwd(), "./tsconfig.json");
