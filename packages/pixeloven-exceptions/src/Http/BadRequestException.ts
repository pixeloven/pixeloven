import ResponseException from "./ResponseException";

class BadRequestException extends ResponseException {
    constructor(message: string = "Bad Request") {
        super(400, message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, BadRequestException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default BadRequestException;
