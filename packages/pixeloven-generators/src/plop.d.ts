import * as inquirer from "inquirer";

export type HelperFunction = (txt: string) => string;

export interface Plop {
    getGenerator(name: string): PlopGenerator;
    setGenerator(name: string, config: PlopGenerator): PlopGenerator;
    getHelper(name: string): HelperFunction;
    setHelper(name: string, fn: HelperFunction): void;
}

export interface PlopGenerator {
    description: string;
    prompts: inquirer.Question[];
    actions: ActionType[] | ((answers: AnswerConfig) => ActionType[]);
}

export type ActionType = string | ActionConfig | CustomActionFunction;

export type CustomActionFunction = (
    answers: object,
    config?: ActionConfig,
    plopfileApi?: NodePlopAPI,
) => Promise<string> | string; // Check return type?

export interface ActionConfig {
    type: string;
    path: string;
    templateFile: string;
    force?: boolean;
    data?: object;
    abortOnFail?: boolean;
}

export interface AnswerConfig {
    includeStyles?: boolean;
    includeStrings?: boolean;
}

export interface PlopCfg {
    force: boolean;
    destBasePath: string;
}
