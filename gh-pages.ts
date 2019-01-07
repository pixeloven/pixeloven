import ghpages from "gh-pages";

/**
 * Publish dist files 
 * @todo First need a simple index file... maybe generated from our README?
 * @todo Next need to publish all docs and link in each packages README.md
 */
ghpages.publish("dist", {

}, (err: Error) => {

});