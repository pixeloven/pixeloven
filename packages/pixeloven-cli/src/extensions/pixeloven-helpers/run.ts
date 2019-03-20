import { system } from "gluegun";

/**
 * Run cmd from arg list.
 * @description Useful for calling existing CLI
 * @param args
 */
function run(args: string[]) {
    return system.spawn(args.join(" "), {
        stdio: "inherit",
    });
}

export default run;
