/**
 * express dynamic middleware
 */
import async from "async";
import { Application, Express, NextFunction, Request, Response } from "express";

/**
 * @type Middleware
 * @description Standard middleware
 */
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

/**
 * @type Layer
 * @description Represents a new application layer. Either a new Application layer or middleware.
 */
type Layers = (Application | Express | Middleware)[];

class DynamicMiddleware {
    protected layers: Layers;

    constructor(layers: Layers = []) {
        this.layers = layers;
    }

    /**
     * Remove all layers
     */
    public clean() {
        this.layers = [];
    }

    /**
     * Return all layers
     */
    public get() {
        return this.layers;
    }

    /**
     * Async handler for middleware
     */
    public handle(): Middleware {
        return (req: Request, res: Response, next: NextFunction) => {
            async.each(
                this.layers,
                (fn, callback) => {
                    /* tslint:disable-next-line no-any */
                    fn(req, res, (err?: any) => {
                        if (err && err.stack && err.message) {
                            callback(err);
                        }
                    });
                },
                (err) => {
                    next(err);
                },
            );
        };
    }

    /**
     * Mounts a new layer
     * @param layer
     */
    public mount(layer: Application | Middleware) {
        this.layers.push(layer);
    }

    /**
     * Removes layer by reference
     * @param layer
     */
    public unmount(layer: Application | Middleware) {
        this.layers = this.layers.filter((l) => l !== layer);
    }
}

export default DynamicMiddleware;
