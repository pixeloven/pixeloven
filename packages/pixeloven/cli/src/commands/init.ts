import { getKeys } from "@pixeloven-core/common";
import { PixelOvenToolbox } from "../types";

enum ProjectType {
    New,
    Existing,
}

type ProjectStrings = keyof typeof ProjectType;

interface ProjectOptions {
    projectType: ProjectStrings;
}

export default {
    name: "init",
    run: async (toolbox: PixelOvenToolbox) => {
        const { prompt, print } = toolbox;

        const statusCode = 0;
        const askCreateQuestions = [
            {
                choices: getKeys(ProjectType),
                filter: (txt: string) => !!ProjectType[txt],
                message: "Is this a new or existing project?",
                name: "isNewProject",
                type: "select",
            },
        ];
        const { projectType } = await prompt.ask<ProjectOptions>(
            askCreateQuestions,
        );
        switch (projectType) {
            case "Existing": {
                print.info(
                    "Please review our getting started section for existing projects https://www.pixeloven.com/docs/getting-started/intro",
                );
                return;
            }
            case "New": {
                return;
            }
        }
        process.exit(statusCode);
    },
};
