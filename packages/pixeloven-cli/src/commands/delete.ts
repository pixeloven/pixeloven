import { GluegunRunContext, print } from "gluegun";

// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-all-help.js
// https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/extensions/amplify-helpers/show-help.js
export default {
    alias: ["--delete"],
    name: "delete",
    run: async (context: GluegunRunContext) => {
        /**
         * @todo rimraf dist
         * @todo rimraf docs
         * @todo rimraf coverage
         * @todo also want to allow for something like pixeloven test --delete
         */
        print.info("Coming soon");
    },
};
