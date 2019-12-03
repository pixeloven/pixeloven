import ghPages from "gh-pages";
import { AddonGhPagesToolbox } from "../types";

/**
 * Publish path
 * @param path
 */
function publish(path: string) {
    return new Promise<number>((resolve, reject) => {
        ghPages.publish(path, (err?: Error) => {
            if (err) {
                reject(err);
            }
            resolve(0);
        });
    });
}

/**
 * Publish dist files
 * @todo Validate path
 * @todo base back specific error codes -- to do that we should write this scrip ourselves
 */
export default (toolbox: AddonGhPagesToolbox) => {
    toolbox.ghPages = async options => {
        const { print } = toolbox;
        try {
            return await publish(options.path);
        } catch (err) {
            if (err && err.message) {
                print.error(err.message);
            }
        }
        return 1;
    };
};
