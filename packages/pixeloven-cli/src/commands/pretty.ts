import { GluegunRunContext } from "gluegun";

// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-all-help.js
// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-help.js
export default {
    alias: ["--pretty", "-p"],
    name: "pretty",
    run: async (context: GluegunRunContext) => {
        const { filesystem, parameters, print } = context;
        /**
         * @todo make into a helper and only do per sub cmd
         */
        const prettierConfigPath = filesystem.path("prettier.json");
        if (filesystem.exists(prettierConfigPath)) {
            print.warning(`Unable to find "prettier.json" reverting to default configuration`);
        }
        const styleLintConfigPath = filesystem.path("stylelint.json");
        if (filesystem.exists(styleLintConfigPath)) {
            print.warning(`Unable to find "stylelint.json" reverting to default configuration`);
        }
        const tsLintConfigPath = filesystem.path("tslint.json");
        if (filesystem.exists(tsLintConfigPath)) {
            print.warning(`Unable to find "tslint.json" reverting to default configuration`);
        }
        /**
         * @todo Need to pass arguments to linter/prettier cmds
         * @todo Should just support globing and remove the need determine the correct linter by param
         */
        switch(parameters.first) {
            case "scss":
                // Run stylelint --fix
                // Run prettier
                print.success(`Successfully prettied {scss}`);
                break;
            case "ts":
            case "tsx":
                // Run tslint --fix
                // Run prettier
                print.success(`Successfully prettied {ts,tsx}`);
                break;
            default:
                // Run stylelint --fix
                // Run tslint --fix
                // Run prettier
                print.success(`Successfully prettied {scss,ts,tsx}`);
                break;
        }
    },
};
