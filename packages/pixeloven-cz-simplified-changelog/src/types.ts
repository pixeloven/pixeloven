/**
 * @todo Make generic so we can more easily do diff configs
 */
export interface Answers {
    body?: string;
    subject: string;
    scope: string;
    type: string;
}

export type CommitFunction = (msg: string) => void;

export type CommitTypeKeys =
    | "build"
    | "chore"
    | "ci"
    | "docs"
    | "feat"
    | "fix"
    | "perf"
    | "refactor"
    | "revert"
    | "style"
    | "test";

export interface CommitTypeObject {
    description: string;
    title: string;
}

export type CommitTypeList = { [K in CommitTypeKeys]: CommitTypeObject };

export interface Options {
    defaultBody: string;
    defaultIssues: string;
    defaultScope: string;
    defaultSubject: string;
    defaultType: string;
    maxHeaderWidth: number;
    maxLineWidth: number;
    types: CommitTypeList;
}
