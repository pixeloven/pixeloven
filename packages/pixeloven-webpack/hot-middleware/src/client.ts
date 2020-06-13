/* tslint:disable no-any */
/* tslint:disable no-null-keyword */
/* global __resourceQuery __webpack_public_path__ */
import querystring, { ParsedUrlQuery } from "querystring";
import type { Options } from "./types";
import OverlayWrapper from "./client-overlay";
import processUpdate from "./process-update";
import strip from "strip-ansi";

const options: Options = {
    ansiColors: {},
    autoConnect: true,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
    overlay: true,
    reload: false,
    log: false,
    warn: true,
    name: "",
    overlayStyles: {},
    overlayWarnings: false,
    timeout: 20 * 1000,
};

if (__resourceQuery) {
    const overrides = querystring.parse(__resourceQuery.slice(1));
    setOverrides(overrides);
}
if (typeof window === "undefined") {
    // do nothing
} else if (typeof window.EventSource === "undefined") {
    console.warn(
        "webpack-hot-middleware's client requires EventSource to work. " +
            "You should include a polyfill if you want to support this browser: " +
            "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools",
    );
} else {
    if (options.autoConnect) {
        connect();
    }
}

/* istanbul ignore next */
function setOptionsAndConnect(overrides: ParsedUrlQuery) {
    setOverrides(overrides);
    connect();
}

function setOverrides(overrides: ParsedUrlQuery) {
    if (overrides.autoConnect) {
        options.autoConnect = overrides.autoConnect === "true";
    }
    if (overrides.path) {
        options.path = Array.isArray(overrides.path)
            ? overrides.path[0]
            : overrides.path;
    }
    if (overrides.timeout) {
        const timeoutStr = Array.isArray(overrides.timeout)
            ? overrides.timeout[0]
            : overrides.timeout;
        options.timeout = parseInt(timeoutStr, 10);
    }
    if (overrides.overlay) {
        options.overlay = overrides.overlay !== "false";
    }
    if (overrides.reload) {
        options.reload = overrides.reload !== "false";
    }
    /**
     * @todo overrides type noInfo
     */
    if (overrides.noInfo && overrides.noInfo !== "false") {
        options.log = false;
    }
    if (overrides.name) {
        options.name = Array.isArray(overrides.name)
            ? overrides.name[0]
            : overrides.name;
    }
    /**
     * @todo overrides type noInfo
     */
    if (overrides.quiet && overrides.quiet !== "false") {
        options.log = false;
        options.warn = false;
    }
    /**
     * @todo overrides type noInfo
     */
    if (overrides.dynamicPublicPath) {
        options.path = __webpack_public_path__ + options.path;
    }
    if (overrides.ansiColors) {
        options.ansiColors = JSON.parse(
            Array.isArray(overrides.ansiColors)
                ? overrides.ansiColors[0]
                : overrides.ansiColors,
        );
    }
    if (overrides.overlayStyles) {
        options.overlayStyles = JSON.parse(
            Array.isArray(overrides.overlayStyles)
                ? overrides.overlayStyles[0]
                : overrides.overlayStyles,
        );
    }
    if (overrides.overlayWarnings) {
        options.overlayWarnings = overrides.overlayWarnings === "true";
    }
}

type MessageEventListner = (event: MessageEvent) => void;

function EventSourceWrapper() {
    let source: EventSource;
    let lastActivity = new Date();
    const listeners: MessageEventListner[] = [];

    init();
    const timer = setInterval(() => {
        const intervalTime = new Date();
        if (intervalTime.valueOf() - lastActivity.valueOf() > options.timeout) {
            handleDisconnect();
        }
    }, options.timeout / 2);

    function init() {
        source = new window.EventSource(options.path);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }

    function handleOnline() {
        if (options.log) {
            console.log("[HMR] connected");
        }
        lastActivity = new Date();
    }

    function handleMessage(event: MessageEvent) {
        lastActivity = new Date();
        for (const listener of listeners) {
            listener(event);
        }
    }

    function handleDisconnect() {
        clearInterval(timer);
        source.close();
        setTimeout(init, options.timeout);
    }

    function addMessageListener(fn: MessageEventListner) {
        listeners.push(fn);
    }

    return {
        addMessageListener,
    };
}

function getEventSourceWrapper() {
    if (!window.__whmEventSourceWrapper) {
        window.__whmEventSourceWrapper = {};
    }
    if (!window.__whmEventSourceWrapper[options.path]) {
        // cache the wrapper for other entries loaded on
        // the same page with the same options.path
        window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
    }
    return window.__whmEventSourceWrapper[options.path];
}

function connect() {
    getEventSourceWrapper().addMessageListener(handleMessage);

    function handleMessage(event: MessageEvent) {
        if (event.data === "\uD83D\uDC93") {
            return;
        }
        try {
            processMessage(JSON.parse(event.data));
        } catch (ex) {
            if (options.warn) {
                console.warn("Invalid HMR message: " + event.data + "\n" + ex);
            }
        }
    }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
const singletonKey = "__webpack_hot_middleware_reporter__";
let reporter: any;
if (typeof window !== "undefined") {
    if (!window[singletonKey]) {
        window[singletonKey] = createReporter();
    }
    reporter = window[singletonKey];
}

function createReporter() {
    let overlay: any;
    if (typeof document !== "undefined" && options.overlay) {
        overlay = OverlayWrapper({
            ansiColors: options.ansiColors,
            overlayStyles: options.overlayStyles,
        });
    }
    const styles = {
        errors: "color: #ff0000;",
        warnings: "color: #999933;",
    };
    let previousProblems: string | null = null;
    function log(type: string, obj: any) {
        const newProblems = obj[type]
            .map((msg: string) => strip(msg))
            .join("\n");
        if (previousProblems === newProblems) {
            return;
        } else {
            previousProblems = newProblems;
        }

        const style = styles[type];
        const name = obj.name ? "'" + obj.name + "' " : "";
        const title =
            "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
        // NOTE: console.warn or console.error will print the stack trace
        // which isn't helpful here, so using console.log to escape it.
        if (console.group && console.groupEnd) {
            console.group("%c" + title, style);
            console.log("%c" + newProblems, style);
            console.groupEnd();
        } else {
            console.log(
                "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
                style + "font-weight: bold;",
                style + "font-weight: normal;",
            );
        }
    }
    return {
        cleanProblemsCache: () => {
            previousProblems = null;
        },
        problems: (type: string, obj: any) => {
            if (options.warn) {
                log(type, obj);
            }
            if (overlay) {
                if (options.overlayWarnings || type === "errors") {
                    overlay.showProblems(type, obj[type]);
                    return false;
                }
                overlay.clear();
            }
            return true;
        },
        success: () => {
            if (overlay) overlay.clear();
        },
        useCustomOverlay: (customOverlay: any) => {
            overlay = customOverlay;
        },
    };
}

type Handler = (obj: any) => void;

let customHandler: Handler;
let subscribeAllHandler: Handler;
function processMessage(obj: any) {
    switch (obj.action) {
        case "building":
            if (options.log) {
                console.log(
                    "[HMR] bundle " +
                        (obj.name ? "'" + obj.name + "' " : "") +
                        "rebuilding",
                );
            }
            break;
        case "built":
            if (options.log) {
                console.log(
                    "[HMR] bundle " +
                        (obj.name ? "'" + obj.name + "' " : "") +
                        "rebuilt in " +
                        obj.time +
                        "ms",
                );
            }
        // fall through
        case "sync":
            if (obj.name && options.name && obj.name !== options.name) {
                return;
            }
            let applyUpdate = true;
            if (obj.errors.length > 0) {
                if (reporter) reporter.problems("errors", obj);
                applyUpdate = false;
            } else if (obj.warnings.length > 0) {
                if (reporter) {
                    const overlayShown = reporter.problems("warnings", obj);
                    applyUpdate = overlayShown;
                }
            } else {
                if (reporter) {
                    reporter.cleanProblemsCache();
                    reporter.success();
                }
            }
            if (applyUpdate) {
                processUpdate(obj.hash, obj.modules, options);
            }
            break;
        default:
            if (customHandler) {
                customHandler(obj);
            }
    }

    if (subscribeAllHandler) {
        subscribeAllHandler(obj);
    }
}

if (module) {
    module.exports = {
        subscribeAll: function subscribeAll(handler: Handler) {
            subscribeAllHandler = handler;
        },
        subscribe: function subscribe(handler: Handler) {
            customHandler = handler;
        },
        useCustomOverlay: function useCustomOverlay(customOverlay: any) {
            if (reporter) {
                reporter.useCustomOverlay(customOverlay);
            }
        },
        setOptionsAndConnect,
    };
}
