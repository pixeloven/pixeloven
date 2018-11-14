import path from "path";

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
