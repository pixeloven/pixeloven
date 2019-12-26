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
        const { template } = toolbox;
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
            target: `packages/${name}/jest.json`,
            template: "package/jest.json.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/package.json`,
            template: "package/package.json.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/prettier.json`,
            template: "package/prettier.json.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/README.md`,
            template: "package/README.md.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/stylelint.json`,
            template: "package/stylelint.json.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/tsconfig.json`,
            template: "package/tsconfig.json.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/tslint.json`,
            template: "package/tslint.json.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/typedoc.json`,
            template: "package/typedoc.json.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/src/constants.ts`,
            template: "package/constants.ts.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/src/index.ts`,
            template: "package/index.ts.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/src/modules.d.ts`,
            template: "package/modules.d.ts.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/src/types.ts`,
            template: "package/types.ts.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/src/_mocks_/files.ts`,
            template: "package/files.ts.ejs",
        });
        template.generate({
            props,
            target: `packages/${name}/src/_mocks_/styles.ts`,
            template: "package/styles.ts.ejs",
        });
    };
    toolbox.createPackage = createPackage;
};
