import path from "path";

/**
 * Load remote config file
 * @description Meant to load asset file
 * @param file
 * @return void
 */
export const importRemoteAsset = (file: string): void => {
    import("./" + file).catch((error: Error) => {
        console.error(`Failed to load remote asset ${file}`, error.message);
    });
};

/**
 * Resolves context for webpack
 * @todo Should make this configurable
 */
export const resolveContext = (): string => path.resolve(process.cwd(), ".");

/**
 * Resolves tsconfig path
 * @todo Should make this configurable
 */
export const resolveTsConfig = (): string =>
    path.resolve(process.cwd(), "./tsconfig.json");
