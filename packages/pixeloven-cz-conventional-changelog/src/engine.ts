/* tslint:disable no-any */
import chalk from "chalk";
import map from "lodash.map";
import longest from "longest";
import rightPad from "right-pad";
import wrap from "word-wrap";
import { Answers, CommitFunction, Options } from "./types";

interface ConventionalAnswers extends Answers {
    isBreaking: boolean;
    isIssueAffected: boolean;
    issues: string;
    breaking: string;
    breakingBody: string;
}

const filter = (array: string[]) => {
    return array.filter(str => {
        return str && str.length;
    });
};

const headerLength = (answers: Answers) => {
    return (
        answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
    );
};

const maxSummaryLength = (options: Options, answers: Answers) => {
    return options.maxHeaderWidth - headerLength(answers);
};

const filterSubject = (subject: string) => {
    subject = subject.trim();
    if (subject.charAt(0).toLowerCase() !== subject.charAt(0)) {
        subject =
            subject.charAt(0).toLowerCase() + subject.slice(1, subject.length);
    }
    while (subject.endsWith(".")) {
        subject = subject.slice(0, subject.length - 1);
    }
    return subject;
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
export default (options: Options) => {
    const types = options.types;
    const length: number = longest(Object.keys(types)).length + 1;
    const choices = map(types, (type, key) => {
        return {
            name: rightPad(key + ":", length) + " " + type.description,
            value: key,
        };
    });

    return {
        // When a user runs `git cz`, prompter will
        // be executed. We pass you cz, which currently
        // is just an instance of inquirer.js. Using
        // this you can ask questions and get answers.
        //
        // The commit callback should be executed when
        // you're ready to send back a commit template
        // to git.
        //
        // By default, we'll de-indent your commit
        // template and will keep empty lines.
        prompter: (cz: any, commit: CommitFunction) => {
            // Let's ask some questions of the user
            // so that we can populate our commit
            // template.
            //
            // See inquirer.js docs for specifics.
            // You can also opt to use another input
            // collection library if you prefer.
            cz.prompt([
                {
                    choices,
                    default: options.defaultType,
                    message:
                        "Select the type of change that you're committing:",
                    name: "type",
                    type: "list",
                },
                {
                    default: options.defaultScope,
                    filter: (value: string) => {
                        return value.trim().toLowerCase();
                    },
                    message:
                        "What is the scope of this change (e.g. component or file name): (press enter to skip)",
                    name: "scope",
                    type: "input",
                },
                {
                    default: options.defaultSubject,
                    filter: (subject: string) => {
                        return filterSubject(subject);
                    },
                    message: (answers: Answers) => {
                        return (
                            "Write a short, imperative tense description of the change (max " +
                            maxSummaryLength(options, answers) +
                            " chars):\n"
                        );
                    },
                    name: "subject",
                    transformer: (subject: string, answers: Answers) => {
                        const filteredSubject = filterSubject(subject);
                        const color =
                            filteredSubject.length <=
                            maxSummaryLength(options, answers)
                                ? chalk.green
                                : chalk.red;
                        return color(
                            "(" + filteredSubject.length + ") " + subject,
                        );
                    },
                    type: "input",
                    validate: (subject: string, answers: Answers) => {
                        const filteredSubject = filterSubject(subject);
                        return filteredSubject.length === 0
                            ? "subject is required"
                            : filteredSubject.length <=
                              maxSummaryLength(options, answers)
                            ? true
                            : "Subject length must be less than or equal to " +
                              maxSummaryLength(options, answers) +
                              " characters. Current length is " +
                              filteredSubject.length +
                              " characters.";
                    },
                },
                {
                    default: options.defaultBody,
                    message:
                        "Provide a longer description of the change: (press enter to skip)\n",
                    name: "body",
                    type: "input",
                },
                {
                    default: false,
                    message: "Are there any breaking changes?",
                    name: "isBreaking",
                    type: "confirm",
                },
                {
                    default: "-",
                    message:
                        "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n",
                    name: "breakingBody",
                    type: "input",
                    validate: (breakingBody: string, answers: Answers) => {
                        return (
                            breakingBody.trim().length > 0 ||
                            "Body is required for BREAKING CHANGE"
                        );
                    },
                    when: (answers: ConventionalAnswers) => {
                        return answers.isBreaking && !answers.body;
                    },
                },
                {
                    message: "Describe the breaking changes:\n",
                    name: "breaking",
                    type: "input",
                    when: (answers: ConventionalAnswers) => {
                        return answers.isBreaking;
                    },
                },

                {
                    default: options.defaultIssues ? true : false,
                    message: "Does this change affect any open issues?",
                    name: "isIssueAffected",
                    type: "confirm",
                },
                {
                    default: "-",
                    message:
                        "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:\n",
                    name: "issuesBody",
                    type: "input",
                    when: (answers: ConventionalAnswers) => {
                        return (
                            answers.isIssueAffected &&
                            !answers.body &&
                            !answers.breakingBody
                        );
                    },
                },
                {
                    default: options.defaultIssues
                        ? options.defaultIssues
                        : undefined,
                    message: `Add issue references (e.g. "fix #123", "re #123".):\n`,
                    name: "issues",
                    type: "input",
                    when: (answers: ConventionalAnswers) => {
                        return answers.isIssueAffected;
                    },
                },
            ]).then((answers: ConventionalAnswers) => {
                const wrapOptions = {
                    cut: false,
                    indent: "",
                    newline: "\n",
                    trim: true,
                    width: options.maxLineWidth,
                };

                // parentheses are only needed when a scope is present
                const scope = answers.scope ? "(" + answers.scope + ")" : "";

                // Hard limit this line in the validate
                const head = answers.type + scope + ": " + answers.subject;

                // Wrap these lines at options.maxLineWidth characters
                const body = answers.body
                    ? wrap(answers.body, wrapOptions)
                    : "";

                // Apply breaking change prefix, removing it if already present
                let breaking = answers.breaking ? answers.breaking.trim() : "";

                breaking = breaking
                    ? "BREAKING CHANGE: " +
                      breaking.replace(/^BREAKING CHANGE: /, "")
                    : "";

                breaking = breaking ? wrap(breaking, wrapOptions) : "";

                const issues = answers.issues
                    ? wrap(answers.issues, wrapOptions)
                    : "";

                commit(filter([head, body, breaking, issues]).join("\n\n"));
            });
        },
    };
};
