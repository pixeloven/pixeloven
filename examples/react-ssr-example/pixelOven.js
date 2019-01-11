/**
 * @todo Need to get this to work inside the webpack build so we can use TS and import TS/JS modules.
 */
module.exports = {
    after: (app) => {
        console.log("After!!!!!!!!!!!!!!");
    },
    before: (app) => {
        console.log("Before!!!!!!!!!!!!!");
    }
};
