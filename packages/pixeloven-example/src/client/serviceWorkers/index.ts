import { config } from "@client/config";
import * as OfflinePluginRuntime from "offline-plugin/runtime";

/**
 * Register service workers
 */
export const register = (): void => {
    if (config.environment === "production") {
        OfflinePluginRuntime.install();
    }
};
