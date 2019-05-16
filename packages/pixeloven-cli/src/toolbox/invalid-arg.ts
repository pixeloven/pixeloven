import { print } from "gluegun";

/**
 * Run cmd from arg list.
 * @description Useful for calling existing CLI
 * @param args
 *
 * @todo should do a process.exit here to make things more testable we should use the abstraction in @core
 * @todo Also might be better to break this into a more general print object
 */
function invalidArgument() {
    print.error("Invalid argument provided");
    print.info("Run --help for more details");
}

export default invalidArgument;
