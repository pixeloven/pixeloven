const fs = require("fs");
const path = require("path");

function getAbsolutePath(...paths) {
    return path.resolve(process.cwd(), ...paths);
}

function getPackage(absPath) {
    const packageJSON = fs.readFileSync(`${absPath}/package.json`);
    return JSON.parse(packageJSON);
}

function isDirectory(absPath) {
    try {
        var stat = fs.lstatSync(absPath);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

module.exports = {
    getAbsolutePath,
    getPackage,
    isDirectory
}