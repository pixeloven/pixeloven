import { Action, combineReducers } from "redux";
/**
 * Example reducer - import others and add them to combineReducers export below
 * @param state
 * @param action
 */
const exampleReducer = (state: string = "asdf", action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    exampleReducer,
    // add more reducers here
});

export interface StoreInterface {
    exampleReducer: string;
}
