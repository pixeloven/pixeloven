import { AddonGeneratorsToolbox, CreatePackageOptions } from "../types";

export default (toolbox: AddonGeneratorsToolbox) => {
    const createPackage = async (options: CreatePackageOptions) => {
        const {
            packageAuthorEmail,
            packageAuthorName,
            packageDescription,
            packageLicense,
            packageName,
            packageNameSpace,
            packageRegistry,
            packageVersion,
        } = options;
        const { filesystem, plugin, template } = toolbox;
        const baseDirectory = plugin && plugin.directory;
        const name = packageName;
        const props = {
            authorEmail: packageAuthorEmail,
            authorName: packageAuthorName,
            description: packageDescription,
            license: packageLicense,
            name,
            nameSpace: packageNameSpace,
            registry: packageRegistry,
            version: packageVersion,
        };

        template.generate({
            props,
            target: `packages/${name}/package.json`,
            template: "package/package.json.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/README.md`,
            template: "package/README.md.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/typedoc.json`,
            template: "package/typedoc.json.ejs",
        });
        filesystem.copy(
            `${baseDirectory}/templates/package`,
            `packages/${name}`,
            { matching: ["!*.ejs", "!*.js"], overwrite: true },
        );
    };

    toolbox.createPackage = createPackage;
};
