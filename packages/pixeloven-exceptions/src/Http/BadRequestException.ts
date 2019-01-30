import HttpResponseException from "./ResponseException";

class HttpBadRequestException extends HttpResponseException {
    constructor(message: string = "Bad Request") {
        super(400, message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, HttpBadRequestException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default HttpBadRequestException;
