module.exports = {
    after: (app) => {
        console.log("After!!!!!!!!!!!!!!");
    },
    before: (app) => {
        console.log("Before!!!!!!!!!!!!!");
    }
}

// Now the issue is how do we get typescript to work here????
// import {} from "some.ts"
// Need to find a way to include this as part of webpack???