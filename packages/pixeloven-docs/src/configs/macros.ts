import path from "path";

/**
 * Resolves context for webpack
 * @todo Should make this configurable
 */
export const resolveSourceRoot = (): string =>
    path.resolve(process.cwd(), "./src");

/**
 * Resolves tsconfig path
 * @todo Should make this configurable
 */
export const resolveTsConfig = (): string =>
    path.resolve(process.cwd(), "./tsconfig.json");
