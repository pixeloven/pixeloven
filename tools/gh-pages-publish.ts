import { readFileSync } from "fs";
import { cd, echo, exec, touch } from "shelljs";
import url from "url";

let repoUrl;
const packageString = readFileSync("package.json", "utf8");
const pkg = JSON.parse(packageString);
if (typeof pkg.repository === "object") {
    if (!pkg.repository.hasOwnProperty("url")) {
        throw new Error("URL does not exist in repository section");
    }
    repoUrl = pkg.repository.url;
} else {
    repoUrl = pkg.repository;
}

const parsedUrl = url.parse(repoUrl);
const repository = (parsedUrl.host || "") + (parsedUrl.path || "");
const ghToken = process.env.GH_TOKEN;

echo("Deploying docs!!!");
cd("docs");
touch(".nojekyll");
exec("git init");
exec("git add .");
exec('git config user.name "Brian Gebel"');
exec('git config user.email "bgebel@pixeloven.com"');
exec('git commit -m "docs(docs): update gh-pages"');
exec(
    `git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`,
);
echo("Docs deployed!!");
