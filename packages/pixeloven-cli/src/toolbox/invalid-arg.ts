import { print } from "gluegun";

/**
 * Print method for invalid argument
 * @description Useful for calling existing CLI
 * @param message
 */
function invalidArgument(message?: string) {
    print.error("Invalid argument provided");
    if (message) {
        print.info(message);
    }
    print.info("Run --help for more details");
}

export default invalidArgument;
