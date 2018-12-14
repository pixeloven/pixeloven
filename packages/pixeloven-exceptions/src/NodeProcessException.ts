import Exception from "./Exception";

/**
 * Node Process Exception
 * @description Extends JS Error to be used when a there is an error when access Node process
 */
class NodeProcessException extends Exception {
    constructor(message: string = "Node process error.") {
        /* istanbul ignore next */
        super(message);
        Object.setPrototypeOf(this, NodeProcessException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default NodeProcessException;
