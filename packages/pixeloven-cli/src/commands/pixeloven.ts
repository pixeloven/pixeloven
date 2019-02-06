import { GluegunRunContext, print } from "gluegun";

// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-all-help.js
// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-help.js
export default {
    name: "pixeloven",
    run: async (context: GluegunRunContext) => {
        /**
         * @todo Print out usage 
         */
        print.info("Coming soon");
    },
};
