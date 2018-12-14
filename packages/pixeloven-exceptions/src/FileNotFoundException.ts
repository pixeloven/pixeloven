import Exception from "./Exception";

/**
 * File Not Found Exception
 * @description Extends JS Error to be used when a file can not be found.
 */
class FileNotFoundException extends Exception {
    constructor(message: string = "File not found.") {
        /* istanbul ignore next */
        super(message);
        Object.setPrototypeOf(this, FileNotFoundException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default FileNotFoundException;
