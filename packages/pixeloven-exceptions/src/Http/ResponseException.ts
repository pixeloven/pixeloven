import Exception from "../Exception";

class ResponseException extends Exception {

    protected statusCode: number;

    constructor(statusCode: number, message: string = "Response Error") {
        super(message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, ResponseException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
    }

    /**
     * Return status code
     * @returns string
     */
    public getStatusCode() {
        return this.statusCode;
    }
}

export default ResponseException;
