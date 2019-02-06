import { GluegunRunContext, print } from "gluegun";

// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-all-help.js
// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-help.js
export default {
    alias: ["--test", "-t"],
    name: "test",
    run: async (context: GluegunRunContext) => {
        /**
         * @todo Run jest tests, ts
         */
        print.info("Coming soon");
    },
};
