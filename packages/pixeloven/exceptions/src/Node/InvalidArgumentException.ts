import Exception from "../Exception";

/**
 * Node Process Exception
 * @description Extends JS Error to be used when a there is an error when access Node process
 */
class NodeInvalidArgumentException extends Exception {
    constructor(message: string = "Invalid argument exception") {
        super(message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, NodeInvalidArgumentException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default NodeInvalidArgumentException;
