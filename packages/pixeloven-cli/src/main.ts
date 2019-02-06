import { resolvePath } from "@pixeloven/core";
import { build } from "gluegun";

/**
 * https://github.com/aws-amplify/amplify-cli/blob/master/packages/amplify-cli/src/cli.js
 * @param argv
 */
async function main(argv: string[]) {
    const cli = build()
        .brand("pixeloven")
        .src(__dirname)
        .plugins(resolvePath("node_modules"), {
            hidden: false,
            matching: "@pixeloven/cli-addon*",
        })
        .version() // provides default for version, v, --version, -v
        .create();

    // and run it
    const context = await cli.run(argv);

    // send it back (for testing, mostly)
    return context;
}

export default main;
