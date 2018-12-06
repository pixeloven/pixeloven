import * as inquirer from "inquirer";

export type HelperFunction = (txt: string) => string

/**
 * @todo Should make my own plop
 *   generators: { [name: string]: PlopGenerator };
 *   helpers: { [name: string]: HelperFunction };
 * @description Based on https://github.com/amwmedia/node-plop/blob/master/index.d.ts
 */
export interface Plop {
  getGenerator(name: string): PlopGenerator;
  setGenerator(name: string, config: PlopGenerator): PlopGenerator;
  getHelper(name: string): HelperFunction;
  setHelper(name: string, fn: HelperFunction): void;
}

export interface PlopGenerator {
  description: string;
  prompts: inquirer.Question[];
  actions: ActionConfig[];
}

export interface ActionConfig {
  type: string;
  path: string;
  templateFile: string;
  force?: boolean;
  data?: object;
  abortOnFail?: boolean;
}

export interface PlopCfg {
  force: boolean;
  destBasePath: string;
}
