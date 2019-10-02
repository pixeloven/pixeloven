import HttpResponseException from "./ResponseException";

class HttpNotFoundException extends HttpResponseException {
    constructor(message: string = "Not Found") {
        super(404, message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, HttpNotFoundException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default HttpNotFoundException;
