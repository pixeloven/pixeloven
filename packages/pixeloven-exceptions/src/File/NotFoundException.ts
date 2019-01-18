import Exception from "../Exception";

/**
 * File Not Found Exception
 * @description Extends JS Error to be used when a file can not be found.
 */
class NotFoundException extends Exception {
    constructor(message: string = "File Not Found") {
        super(message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, NotFoundException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default NotFoundException;
