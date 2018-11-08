import Exception from "./Exception";

/**
 * Node Process Exception
 * @description Extends JS Error to be used when a there is an error when access Node process
 */
class NodeProcessException extends Exception {

    constructor(message?: string) {
        super(message || "Node process error.");
    }
}

export default NodeProcessException;
