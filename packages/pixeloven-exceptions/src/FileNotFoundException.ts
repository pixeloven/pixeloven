import Exception from "./Exception";

/**
 * File Not Found Exception
 * @description Extends JS Error to be used when a file can not be found.
 */
class FileNotFoundException extends Exception {
    constructor(message?: string) {
        super(message || "File not found.");
        Object.setPrototypeOf(this, FileNotFoundException.prototype)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.name = this.constructor.name;
    }
}

export default FileNotFoundException;
