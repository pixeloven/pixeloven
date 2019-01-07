import ghpages from "gh-pages";

/**
 * Publish dist files
 */
const main = (argv: string[]) => {
    // TODO typedoc should be added to -cli? or -docs
    // TODO need to fix ts-config to not exclude stories and tests
    // TODO for now just publish all .MD files for each package. Even private ones

    // TODO loop though each package and run below
    ghpages.publish("dist", {
        // woot
    }, (err: Error) => {
        // lame
    });
};

export default main;