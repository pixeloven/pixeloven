import { AddonGeneratorsToolbox, CreateComponentOptions } from "../types";

export default (toolbox: AddonGeneratorsToolbox) => {
    const createComponent = async (options: CreateComponentOptions) => {
        const {
            componentAtomicType,
            componentDescription,
            componentParadigmType,
            componentName,
            componentHasState,
            componentHasStyle,
        } = options;
        const { strings, template } = toolbox;
        const className = `${strings.lowerCase(
            componentAtomicType.charAt(0),
        )}-${strings.kebabCase(componentName)}`;
        const name = `${strings.pascalCase(componentName)}`;
        const props = {
            atomicType: componentAtomicType,
            camelName: strings.camelCase(name),
            className,
            description: componentDescription,
            hasState: componentHasState,
            hasStyle: componentHasStyle,
            name,
        };
        const atomicType = strings.pluralize(
            strings.lowerCase(componentAtomicType),
        );
        const paradigmType = strings.lowerCase(componentParadigmType);
        template.generate({
            props,
            target: `src/shared/components/${atomicType}/${name}/${name}.tsx`,
            template: `component/${paradigmType}.Component.tsx.ejs`,
        });
        template.generate({
            props,
            target: `src/shared/components/${atomicType}/${name}/${name}.scss`,
            template: `component/Component.scss.ejs`,
        });
        template.generate({
            props,
            target: `src/shared/components/${atomicType}/${name}/${name}.stories.tsx`,
            template: `component/Component.stories.tsx.ejs`,
        });
        template.generate({
            props,
            target: `src/shared/components/${atomicType}/${name}/${name}.test.tsx`,
            template: `component/Component.test.tsx.ejs`,
        });
        template.generate({
            props,
            target: `src/shared/components/${atomicType}/${name}/index.ts`,
            template: `component/index.ts.ejs`,
        });
        template.generate({
            props,
            target: `src/shared/components/${atomicType}/${name}/README.md`,
            template: `component/README.md.ejs`,
        });
    };
    toolbox.createComponent = createComponent;
};
