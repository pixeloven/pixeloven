import { AddonGeneratorsToolbox, CreateAppOptions } from "../types";

export default (toolbox: AddonGeneratorsToolbox) => {
    const createApp = async (options: CreateAppOptions) => {
        const {
            appAuthorEmail,
            appAuthorName,
            appDescription,
            appLicense,
            appName,
            appNameSpace,
            appRegistry,
            appVersion,
        } = options;
        const { filesystem, plugin, template } = toolbox;
        const baseDirectory = plugin && plugin.directory;
        const name = appName;
        const props = {
            authorEmail: appAuthorEmail,
            authorName: appAuthorName,
            description: appDescription,
            license: appLicense,
            name,
            nameSpace: appNameSpace,
            registry: appRegistry,
            version: appVersion,
        };

        template.generate({
            props,
            target: `apps/${name}/package.json`,
            template: "app-ssr/package.json.ejs",
        });
        template.generate({
            props,
            target: `apps/${name}/README.md`,
            template: "app-ssr/README.md.ejs",
        });
        filesystem.copy(`${baseDirectory}/templates/app-ssr`, `apps/${name}`, {
            matching: ["!*.ejs", "!*.js"],
            overwrite: true,
        });
    };
    toolbox.createApp = createApp;
};
