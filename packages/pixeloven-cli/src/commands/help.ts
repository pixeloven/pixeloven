import { GluegunRunContext } from "gluegun";

export default {
    alias: ["--help", "-h"],
    name: "help",
    run: async (context: GluegunRunContext) => {
        const { print } = context;
        print.info("Coming soon");
    },
};
