/**
 * @todo CA-1050 Need to tailor this to be more JIRA/Bitbucket and GFM specific
 *          - We can create our own standard off of this: https://github.com/klauskpm/cz-simple-changelog
 * 
 * @description: We are currently following a strict standard defined by the open source community based on Angular development.
 *               Rules can be adjusted for our needs based on the following docs: 
 * 
 * @url https://conventional-changelog.github.io/commitlint/#/reference-configuration
 */
module.exports = {
    rules: {
        "body-leading-blank": [1, "always"],
        "footer-leading-blank": [1, "always"],
        "header-max-length": [2, "always", 72],
        "scope-case": [2, "always", "lower-case"],
        "subject-case": [
            2,
            "never",
            ["sentence-case", "start-case", "pascal-case", "upper-case"],
        ],
        "subject-empty": [2, "never"],
        "subject-full-stop": [2, "never", "."],
        "type-case": [2, "always", "lower-case"],
        "type-empty": [2, "never"],
        "type-enum": [
            2,
            "always",
            [
                "build",
                "chore",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "refactor",
                "revert",
                "style",
                "test",
            ],
        ],
    },
};