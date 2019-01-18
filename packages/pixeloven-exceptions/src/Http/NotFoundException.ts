import ResponseException from "./ResponseException";

class NotFoundException extends ResponseException {
    constructor(message: string = "Not Found") {
        super(404, message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, NotFoundException.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default NotFoundException;
