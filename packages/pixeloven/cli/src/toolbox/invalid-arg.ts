import { print } from "gluegun";

/**
 * Print method for invalid argument
 * @description Useful for calling existing CLI
 * @param message
 */
function invalidArgument(message?: string, argument?: string) {
    if (argument) {
        print.error(`${argument} is not a valid argument. ${message}`);
    } else {
        print.error(`Invalid argument provided. ${message}`);
    }
    print.info("Run --help for more details");
}

export default invalidArgument;
