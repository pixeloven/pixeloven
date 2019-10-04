import ResponseException from "./ResponseException";

class ForbiddenException extends ResponseException {
    constructor(message: string = "Forbidden") {
        super(403, message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, ForbiddenException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ForbiddenException;
