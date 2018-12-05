import * as inquirer from "inquirer";

// Based on https://github.com/amwmedia/node-plop/blob/master/index.d.ts
export interface Plop {
  getGenerator(name: string): PlopGenerator;
  setGenerator(name: string, config: PlopGenerator): PlopGenerator;
  setHelper(name:string,fn:Function):void;
  getHelper(name:string):Function;
}

interface PlopGenerator{
  description: string;
  prompts: inquirer.Question[];
  actions: ActionConfig[];
}

interface ActionConfig{
  type: string;
  path: string;
  templateFile: string;
  force?: boolean;
  data?: object;
  abortOnFail?: boolean;
}

interface PlopCfg{
  force: boolean;
  destBasePath: string;
}
