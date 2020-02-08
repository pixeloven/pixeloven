import { getKeys } from "@pixeloven-core/common";
import * as Validation from "@pixeloven-core/validation";
import { PixelOvenToolbox } from "../types";

enum ProjectType {
    New,
    Existing,
}
type ProjectStrings = keyof typeof ProjectType;

enum PackageManager {
    NPM,
    Yarn,
}
type PackageManagerStrings = keyof typeof PackageManager;

interface ProjectOptions {
    projectType: ProjectStrings;
}

interface NewProjectOptions {
    projectName: string;
    projectAuthor: string;
    projectDescription: string;
    projectPackageManager: PackageManagerStrings;
}

export default {
    name: "init",
    run: async (toolbox: PixelOvenToolbox) => {
        const { prompt, print, template } = toolbox;

        /**
         * @todo init should just create the basic project and then the generator addon is installed and can be run by the user to create apps and packages
         * @todo why does this not actually generate anything :(
         * @todo need to make sure all paths are lower case
         * @todo let's simplify tsconfig
         * @todo Need to add all of our addon stuff
         * @todo why does it assume /bu
         * @param dist/lib/build/templates/ ????????????????????????????????????
         */
        async function generate(props: NewProjectOptions) {
            const { projectName } = props;
            await template.generate({
                props,
                target: `${projectName.toLowerCase()}/apps/.gitkeep`,
                template: "project/gitkeep.ejs",
            });
            await template.generate({
                props,
                target: `${projectName.toLowerCase()}/packages/.gitkeep`,
                template: "project/gitkeep.ejs",
            });
            await template.generate({
                props,
                target: `${projectName.toLowerCase()}/lerna.json`,
                template: "project/lerna.json.ejs",
            });
            await template.generate({
                props,
                target: `${projectName.toLowerCase()}/package.json`,
                template: "project/package.json.ejs",
            });
            await template.generate({
                props,
                target: `${projectName.toLowerCase()}/tsconfig.json`,
                template: "project/tsconfig.json.ejs",
            });
        }

        const statusCode = 0;
        const askProjectQuestions = [
            {
                choices: getKeys(ProjectType),
                message: "Is this a new or existing project?",
                name: "projectType",
                type: "select",
            },
        ];
        const askNewProjectQuestions = [
            {
                choices: getKeys(PackageManager),
                message: `Which package manager do you prefer?`,
                name: "projectPackageManager",
                suggest: PackageManager.Yarn,
                type: "select",
            },
            {
                message: "What should this project be called?",
                name: "projectName",
                type: "input",
                validate: Validation.isAWord,
            },
            {
                message: "What is the author's name?",
                name: "projectAuthor",
                type: "input",
                validate: Validation.minLength(1),
            },
            {
                message: "Please provide a short description of this project.",
                name: "projectDescription",
                type: "input",
                validate: Validation.minLength(1),
            },
        ];
        const { projectType } = await prompt.ask<ProjectOptions>(
            askProjectQuestions,
        );
        switch (projectType) {
            case "Existing": {
                print.info(
                    "Please review our getting started section for existing projects https://www.pixeloven.com/docs/getting-started/intro",
                );
                break;
            }
            case "New": {
                const props = await prompt.ask<NewProjectOptions>(
                    askNewProjectQuestions,
                );
                await generate(props);
                // @todo run npm/yarn install here.....
                // @todo print messages about next steps for creating apps and packages!!!!
                // @todo create app generator inn the addon...
                break;
            }
        }
        process.exit(statusCode);
    },
};
