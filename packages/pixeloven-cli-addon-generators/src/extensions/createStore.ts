import {
    AddonGeneratorsToolbox,
    CreateStoreOptions,
} from "../types";

export default (toolbox: AddonGeneratorsToolbox) => {
    const createStore = async (options: CreateStoreOptions) => {
        console.log("");
    }
       
    toolbox.createStore = createStore;
};
