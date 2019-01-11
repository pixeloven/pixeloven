import { Application } from "express";

export interface Options {
    after?: (app: Application) => void;
    before?: (app: Application) => void;
}

class Features {
    protected options: Options;

    /**
     * Construct features
     * @param options
     */
    constructor(options: Options) {
        this.options = options;
    }

    /**
     * Executes user defined "after" callback
     * @param app
     */
    public after(app: Application) {
        if (this.options.after) {
            this.options.after(app);
        }
    }

    /**
     * Executes user defined "before" callback
     * @param app
     */
    public before(app: Application) {
        if (this.options.before) {
            this.options.before(app);
        }
    }
}

export default Features;
