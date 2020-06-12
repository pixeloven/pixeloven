/* tslint:disable no-any */

module.exports = webpackHotMiddleware;

import type { Compiler, Stats } from "webpack";
import { pathMatch } from "./helpers";

type LogFunction = (message?: any, ...optionalParams: any[]) => void;

interface Options {
    log?: LogFunction;
    heartbeat?: number;
    path?: string;
}

interface Clients {
    [id: number]: any;
}

type ClientCallback = (res: any) => void;

function extractBundles(stats: any) {
    // Stats has modules, single bundle
    if (stats.modules) {
        return [stats];
    }
    // Stats has children, multiple bundles
    if (stats.children && stats.children.length) {
        return stats.children;
    }

    // Not sure, assume single
    return [stats];
}

function buildModuleMap(modules: any[]) {
    const map = {};
    modules.forEach((module) => {
        map[module.id] = module.name;
    });
    return map;
}

function createEventStream(heartbeat: number) {
    let clientId = 0;
    let clients: Clients = {};
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream;charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        // While behind nginx, event stream should not be buffered:
        // http://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffering
        "X-Accel-Buffering": "no",
    };

    function everyClient(fn: ClientCallback) {
        Object.keys(clients).forEach((id) => {
            fn(clients[id]);
        });
    }

    function heartbeatTick() {
        everyClient((client) => {
            client.write("data: \uD83D\uDC93\n\n");
        });
    }

    const interval = setInterval(heartbeatTick, heartbeat).unref();

    return {
        close: () => {
            clearInterval(interval);
            everyClient((client) => {
                if (!client.finished) {
                    client.end();
                }
            });
            clients = {};
        },
        handler: (req: any, res: any) => {
            const isHttp1 = !(parseInt(req.httpVersion, 10) >= 2);
            if (isHttp1) {
                req.socket.setKeepAlive(true);
                Object.assign(headers, {
                    Connection: "keep-alive",
                });
            }

            res.writeHead(200, headers);
            res.write("\n");
            const id = clientId++;
            clients[id] = res;
            req.on("close", () => {
                if (!res.finished) {
                    res.end();
                }
                delete clients[id];
            });
        },
        publish: (payload: object) => {
            everyClient((client) => {
                client.write("data: " + JSON.stringify(payload) + "\n\n");
            });
        },
    };
}

function publishStats(
    action: any,
    statsResult: any,
    eventStream: any,
    log?: LogFunction,
) {
    const statsResultJson = statsResult.toJson({
        all: false,
        cached: true,
        children: true,
        modules: true,
        timings: true,
        hash: true,
    });
    // For multi-compiler, stats will be an object with a 'children' array of stats
    const bundles = extractBundles(statsResultJson);
    bundles.forEach((stats: any) => {
        let name = stats.name || "";

        // Fallback to compilation name in case of 1 bundle (if it exists)
        if (bundles.length === 1 && !name && statsResult.compilation) {
            name = statsResult.compilation.name || "";
        }

        if (log) {
            log(
                "webpack built " +
                    (name ? name + " " : "") +
                    stats.hash +
                    " in " +
                    stats.time +
                    "ms",
            );
        }
        eventStream.publish({
            action,
            errors: stats.errors || [],
            hash: stats.hash,
            modules: buildModuleMap(stats.modules),
            name,
            time: stats.time,
            warnings: stats.warnings || [],
        });
    });
}

function webpackHotMiddleware(compiler: Compiler, opts: Options) {
    opts = opts || {};
    opts.log =
        typeof opts.log === "undefined" ? console.log.bind(console) : opts.log;
    opts.path = opts.path || "/__webpack_hmr";
    opts.heartbeat = opts.heartbeat || 10 * 1000;

    let eventStream = createEventStream(opts.heartbeat);
    let latestStats: Stats | undefined;
    let closed = false;

    if (compiler.hooks) {
        compiler.hooks.invalid.tap("webpack-hot-middleware", onInvalid);
        compiler.hooks.done.tap("webpack-hot-middleware", onDone);
    } else {
        compiler.plugin("invalid", onInvalid);
        compiler.plugin("done", onDone);
    }

    function onInvalid() {
        if (closed) {
            return;
        }
        latestStats = undefined;
        if (opts.log) {
            opts.log("webpack building...");
        }
        eventStream.publish({ action: "building" });
    }

    function onDone(statsResult: Stats) {
        if (closed) {
            return;
        }
        // Keep hold of latest stats so they can be propagated to new clients
        latestStats = statsResult;
        publishStats("built", latestStats, eventStream, opts.log);
    }
    function middleware(req: any, res: any, next: any) {
        if (closed) {
            return next();
        }
        if (opts.path && !pathMatch(req.url, opts.path)) {
            return next();
        }
        eventStream.handler(req, res);
        if (latestStats) {
            // Explicitly not passing in `log` fn as we don't want to log again on
            // the server
            publishStats("sync", latestStats, eventStream);
        }
    }
    middleware.publish = (payload: any) => {
        if (closed) {
            return;
        }
        eventStream.publish(payload);
    };
    middleware.close = () => {
        if (closed) {
            return;
        }
        // Can't remove compiler plugins, so we just set a flag and noop if closed
        // https://github.com/webpack/tapable/issues/32#issuecomment-350644466
        closed = true;
        eventStream.close();
        // @ts-ignore
        eventStream = undefined;
    };
    return middleware;
}
