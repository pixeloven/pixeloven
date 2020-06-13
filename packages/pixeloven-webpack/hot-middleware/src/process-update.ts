/* tslint:disable no-any */
/* tslint:disable no-null-keyword */
import type { Options, ModuleId } from "./types";

if (!module.hot) {
    throw new Error("[HMR] Hot Module Replacement is disabled.");
}

const hmrDocsUrl = "https://webpack.js.org/concepts/hot-module-replacement/";

let lastHash: string;
const failureStatuses = { abort: 1, fail: 1 };
const applyOptions = {
    ignoreUnaccepted: true,
    ignoreDeclined: true,
    ignoreErrored: true,
    onUnaccepted: (data: any) => {
        console.warn(
            "Ignored an update to unaccepted module " + data.chain.join(" -> "),
        );
    },
    onDeclined: (data: any) => {
        console.warn(
            "Ignored an update to declined module " + data.chain.join(" -> "),
        );
    },
    onErrored: (data: any) => {
        console.error(data.error);
        console.warn(
            "Ignored an error while updating module " +
                data.moduleId +
                " (" +
                data.type +
                ")",
        );
    },
};

function upToDate(hash?: string) {
    if (hash) {
        lastHash = hash;
    }
    return lastHash === __webpack_hash__;
}

export default function (hash: string, moduleMap: any, options: Options) {
    const reload = options.reload;
    if (!upToDate(hash) && module.hot && module.hot.status() === "idle") {
        if (options.log) {
            console.log("[HMR] Checking for updates on the server...");
        }
        check();
    }

    function check() {
        if (module.hot) {
            module.hot.check(false, (err, updatedModules) => {
                if (err) {
                    return handleError(err);
                }
                if (!updatedModules) {
                    if (options.warn) {
                        console.warn(
                            "[HMR] Cannot find update (Full reload needed)",
                        );
                        console.warn(
                            "[HMR] (Probably because of restarting the server)",
                        );
                    }
                    performReload();
                    return;
                }
                if (module.hot) {
                    module.hot.apply(
                        applyOptions,
                        (applyErr, renewedModules) => {
                            if (applyErr) {
                                return handleError(applyErr);
                            }
                            if (!upToDate()) {
                                check();
                            }
                            logUpdates(updatedModules, renewedModules);
                        },
                    );
                }
            });
        }
    }

    function logUpdates(
        updatedModules: ModuleId[],
        renewedModules: ModuleId[],
    ) {
        const unacceptedModules = updatedModules.filter((moduleId) => {
            return renewedModules && renewedModules.indexOf(moduleId) < 0;
        });
        if (unacceptedModules.length > 0) {
            if (options.warn) {
                console.warn(
                    "[HMR] The following modules couldn't be hot updated: " +
                        "(Full reload needed)\n" +
                        "This is usually because the modules which have changed " +
                        "(and their parents) do not know how to hot reload themselves. " +
                        "See " +
                        hmrDocsUrl +
                        " for more details.",
                );
                unacceptedModules.forEach((moduleId) => {
                    console.warn(
                        "[HMR]  - " + (moduleMap[moduleId] || moduleId),
                    );
                });
            }
            performReload();
            return;
        }

        if (options.log) {
            if (!renewedModules || renewedModules.length === 0) {
                console.log("[HMR] Nothing hot updated.");
            } else {
                console.log("[HMR] Updated modules:");
                renewedModules.forEach((moduleId) => {
                    console.log(
                        "[HMR]  - " + (moduleMap[moduleId] || moduleId),
                    );
                });
            }
            if (upToDate()) {
                console.log("[HMR] App is up to date.");
            }
        }
    }

    function handleError(err: Error) {
        if (module.hot && module.hot.status() in failureStatuses) {
            if (options.warn) {
                console.warn(
                    "[HMR] Cannot check for update (Full reload needed)",
                );
                console.warn("[HMR] " + (err.stack || err.message));
            }
            performReload();
            return;
        }
        if (options.warn) {
            console.warn(
                "[HMR] Update check failed: " + (err.stack || err.message),
            );
        }
    }

    function performReload() {
        if (reload) {
            if (options.warn) console.warn("[HMR] Reloading page");
            window.location.reload();
        }
    }
}
