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
         * @param name
         */
        function generate(props: NewProjectOptions) {
            const { projectName } = props;
            template.generate({
                props,
                target: `${projectName}/apps/.gitkeep`,
                template: ".gitkeep.ejs",
            });
            template.generate({
                props,
                target: `${projectName}/packages/.gitkeep`,
                template: ".gitkeep.ejs",
            });
            template.generate({
                props,
                target: `${projectName}/lerna.json`,
                template: "lerna.json.ejs",
            });
            template.generate({
                props,
                target: `${projectName}/package.json`,
                template: "package.json.ejs",
            });
            template.generate({
                props,
                target: `${projectName}/tsconfig.json`,
                template: "tsconfig.json.ejs",
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
                message: `Which package manager do you prefer? `,
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
                generate(props);
                break;
            }
        }
        process.exit(statusCode);
    },
};
