import { GluegunRunContext, print } from "gluegun";

// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-all-help.js
// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-help.js
export default {
    alias: ["--lint", "-l"],
    name: "lint",
    run: async (context: GluegunRunContext) => {
        /**
         * @todo Lint ts, scss
         */
        print.info("Coming soon");
    },
};
