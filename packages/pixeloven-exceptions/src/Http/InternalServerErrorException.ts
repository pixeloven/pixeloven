import ResponseException from "./ResponseException";

class InternalServerErrorException extends ResponseException {
    constructor(message: string = "Internal Server Error") {
        super(500, message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, InternalServerErrorException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default InternalServerErrorException;
