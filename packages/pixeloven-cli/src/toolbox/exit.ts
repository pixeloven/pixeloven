import { print } from "gluegun";

/**
 * Run cmd from arg list.
 * @description Useful handling status codes and printing results
 * @param cmd 
 * @param status
 * @param success
 * 
 * @todo Should add a debug mode and spit out the entire error?
 */
function exit(cmd: string, status: number, success: string = "Success") {
    if (status) {
        print.error(`${name} exited with status ${status}\n`);
        process.exit(status);
    } else {
        print.success(success);
    }
    return status;
};

export default exit;
