import { GluegunRunContext, print } from "gluegun";

// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-all-help.js
// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-help.js
export default {
    alias: ["--compile", "-c"],
    name: "compile",
    run: async (context: GluegunRunContext) => {
        /**
         * @todo Compile 
         */
        print.info("Coming soon");
    },
};
