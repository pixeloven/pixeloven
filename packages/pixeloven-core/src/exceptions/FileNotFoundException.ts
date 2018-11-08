import Exception from "./Exception";

/**
 * File Not Found Exception
 * @description Extends JS Error to be used when a file can not be found.
 */
class FileNotFoundException extends Exception {

    constructor(message?: string) {
        super(message || "File not found.");
    }
}

export default FileNotFoundException;
