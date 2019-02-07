import { GluegunRunContext } from "gluegun";

export default {
    alias: ["--lint", "-l"],
    name: "lint",
    run: async (context: GluegunRunContext) => {
        const { filesystem, parameters, print } = context;
        const styleLintConfigPath = filesystem.path("stylelintrc.json");
        if (filesystem.exists(styleLintConfigPath)) {
            print.warning(`Unable to find "stylelintrc.json" reverting to default configuration`);
        }
        /**
         * @todo Need to pass arguments to linter cmds
         * @todo Should just support globing and remove the need determine the correct linter by param
         */
        switch(parameters.first) {
            case "scss":
                print.success(`Successfully linted {scss}`);
                break;
            case "ts":
            case "tsx":
                print.success(`Successfully linted {ts,tsx}`);
                break;
            default:
                print.error("Invalid arguments provided");
                print.info("Usage: (scss|ts|tsx)");
                break;
        }
    },
};
