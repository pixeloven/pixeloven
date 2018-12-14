/**
 * Generic Exception
 */
class Exception extends Error {
    /**
     * Build exception
     * @param message
     */
    constructor(message: string) {
        super(message) /* istanbul ignore next: can't cover */;
        Object.setPrototypeOf(this, Exception.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Return message from exception
     * @returns string
     */
    public getMessage(): string {
        return this.message;
    }

    /**
     * Return name of exception
     * @returns string
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Return stack trace if it exists
     * @returns string
     */
    public getStack(): string | undefined {
        return this.stack;
    }
}

export default Exception;
