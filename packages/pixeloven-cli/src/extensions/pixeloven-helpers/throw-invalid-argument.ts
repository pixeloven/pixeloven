import { NodeInvalidArgumentException } from "@pixeloven/exceptions";
import { print } from "gluegun";

const throwInvalidArgument = () => {
    print.error("Invalid argument provided");
    print.info("Run --help for more details");
};

export default throwInvalidArgument;

