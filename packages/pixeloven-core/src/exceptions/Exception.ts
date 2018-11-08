/**
 * Generic Exception
 */
// TODO need to unify our error handling for server, client and build scripts

class Exception extends Error {

    public name: string;
    public message: string;

    constructor(message: string) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.name = this.constructor.name;
        this.message = message;
    }
}

export default Exception;
