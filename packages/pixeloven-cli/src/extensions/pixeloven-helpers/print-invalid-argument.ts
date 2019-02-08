import { print } from "gluegun";

export type PrintInvalidArgumentFunction = () => void;

export default () => {
    print.error("Invalid argument provided");
    print.info("Run --help for more details");
};
