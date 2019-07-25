import {
    AddonGeneratorsToolbox,
    CreateComponentOptions
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
        const {componentAtomicType, componentName, componentHasState} = options;
        const { template } = toolbox;
        template.generate({
            props: {
                component: {
                    hasState: componentHasState,
                    name: componentName,
                }
            },
            target: `src/components/${componentAtomicType}/${componentName}.ts`,   
            template: 'component/functional.ejs',
        });
    };
    toolbox.createComponent = createComponent;
};
