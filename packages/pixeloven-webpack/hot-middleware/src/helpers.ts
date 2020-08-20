import { parse } from "url";

/**
 * @param url
 * @param path
 */
export function pathMatch(url: string, path: string) {
    try {
        return parse(url).pathname === path;
    } catch (e) {
        return false;
    }
}
