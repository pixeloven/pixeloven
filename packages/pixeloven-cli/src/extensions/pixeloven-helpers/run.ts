import { system } from "gluegun";
import { RunFunction } from "../../types";

const run: RunFunction = (args: string[]) => {
    return system.spawn(args.join(" "));
};

export default run;
