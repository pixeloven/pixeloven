import Exception from "../Exception";

/**
 * Node Process Exception
 * @description Extends JS Error to be used when a there is an error when access Node process
 */
class ProcessException extends Exception {
    constructor(message: string = "Node Process Error") {
        super(message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, ProcessException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ProcessException;
