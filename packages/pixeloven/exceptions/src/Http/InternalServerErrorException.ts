import HttpResponseException from "./ResponseException";

class HttpInternalServerErrorException extends HttpResponseException {
    constructor(message: string = "Internal Server Error") {
        super(500, message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, HttpInternalServerErrorException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default HttpInternalServerErrorException;
