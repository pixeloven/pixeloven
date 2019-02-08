import { GluegunRunContext } from "gluegun";

export default {
    name: "webpack",
    run: async (context: GluegunRunContext) => {
        const { print } = context;
        print.info("Coming soon");
    },
};
