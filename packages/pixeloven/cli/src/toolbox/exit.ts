import { print } from "gluegun";

/**
 * Run cmd from arg list.
 * @description Useful handling status codes and printing results
 * @param name
 * @param status
 * @param msg
 *
 * @todo Should add a debug mode and spit out the entire error?
 */
function exit(name: string, status: number, msg: string = "Success!") {
    if (status) {
        print.error(`${name} exited with status ${status}\n`);
        process.exit(status);
    } else {
        print.success(msg);
    }
    return status;
}

export default exit;
