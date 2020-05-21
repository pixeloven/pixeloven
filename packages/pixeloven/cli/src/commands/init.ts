import { getKeys } from "@pixeloven-core/common";
import * as Validation from "@pixeloven-core/validation";
import { PixelOvenToolbox } from "../types";

enum PackageManager {
    NPM,
    Yarn,
}
type PackageManagerStrings = keyof typeof PackageManager;

interface NewProjectOptions {
    projectName: string;
    projectAuthor: string;
    projectDescription: string;
    projectPackageManager: PackageManagerStrings;
}

export default {
    description: "PixelOven initializer",
    name: "init",
    run: async (toolbox: PixelOvenToolbox) => {
        const { prompt, print, system, template } = toolbox;

        /**
         * Wrapper for all the generators
         * @param props
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
        let statusCode = 0;
        try {
            const props = await prompt.ask<NewProjectOptions>(
                askNewProjectQuestions,
            );
            await generate(props);
            system.spawn("yarn install");
            print.info(
                `Next try "yarn generate" to start your first application or package.`,
            );
        } catch (e) {
            statusCode = 1;
        }
        process.exit(statusCode);
    },
};
