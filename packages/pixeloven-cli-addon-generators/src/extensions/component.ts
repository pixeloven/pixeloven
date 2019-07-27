import {
    AddonGeneratorsToolbox,
    AtomicDesignType,
    CreateComponentOptions,
    ProgrammingParadigmType,
} from "../types";

/**
 * @todo can we use any of this https://github.com/glenjamin/ultimate-hot-reloading-example
 * @todo bring this back https://github.com/gaearon/react-hot-loader
 * @todo FIX client onDone runs twice which means we are compile an extra time :(
 * @todo 1) Create CLI options for --open (auto-open)
 * @todo 2) Create CLI options for --choose-port (auto-choose-port)
 * @todo 3) Create CLI options for --machine (host|docker|virtual)
 *
 * @todo 4) Make logging to json would be nice
 * 
 * @todo Make build and dev-server configurable through CLI.
 */
export default (toolbox: AddonGeneratorsToolbox) => {
    const createComponent = async (options: CreateComponentOptions) => {
        const {componentAtomicType, componentParadigmType, componentName, componentHasState, componentHasStyle} = options;
        const { template } = toolbox;
        const atomicType = AtomicDesignType[componentAtomicType];
        const paradigmType = ProgrammingParadigmType[componentParadigmType];
        const props = {
            component: {
                atomicType,
                hasState: componentHasState,
                hasStyle: componentHasStyle,
                name: componentName,
            }
        };
        template.generate({
            props,
            target: `src/components/${atomicType}/${componentName}/${componentName}.tsx`,   
            template: `component/${paradigmType}.Component.tsx.ejs`,
        });
        template.generate({
            props,
            target: `src/components/${atomicType}/${componentName}/${componentName}.scss`,   
            template: `component/Component.scss`,
        });
        template.generate({
            props,
            target: `src/components/${atomicType}/${componentName}/${componentName}.stories.tsx`,   
            template: `component/Component.stories.tsx.ejs`,
        });
        template.generate({
            props,
            target: `src/components/${atomicType}/${componentName}/${componentName}.test.tsx`,   
            template: `component/Component.test.tsx.ejs`,
        });
        template.generate({
            props,
            target: `src/components/${atomicType}/${componentName}/${componentName}.ts`,   
            template: `component/index.ts.ejs`,
        });
    };
    toolbox.createComponent = createComponent;
};
